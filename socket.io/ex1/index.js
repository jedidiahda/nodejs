var http = require('http'), //http module is used to create the server,
    fs = require('fs'), //fs module is used to read the CSS and HTML files from the disk.
    port = 3000,
    /*
    The html and css variables contain the actual code that will be sent to the browser
    */
    /*
    asynchronously: executing reading file without blocking any javascript code
    synchronously: until the file is fully readed, then execute other javascript code
    
    fs.readFileSync operations in the server's handler will make our chat
    a bit slow because we will read from the disk during every request.
    
    */
    html = fs.readFileSync(__dirname + '/html/page.html', {
        encoding:
            'utf8'
    }),
    css = fs.readFileSync(__dirname + '/css/styles.css', {
        encoding:
            'utf8'
    });

//the crypto module, which is available by default in Node.js
var crypto = require('crypto');
var users = [];

var app = http.createServer(function (req, res) {
    /*http.createServer method returns a new web server object. 
        We have to pass this object to Socket.IO.
    */
    if (req.url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(css);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }
}).listen(port, '127.0.0.1');

var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
    /*
    set unique ID for every user.
    */
    var id = crypto.randomBytes(20).toString('hex');
    users.push({ socket: socket, id: id, name: null });
    //create event welcome
    socket.emit('welcome', { message: 'Welcome!' });
    sendUsers();
    //create event send
    socket.on('send', function (data) {
        if (data.username !== '') {
            setUsername(id, data.username);
        }

        if (data.toUser !== '') {
            users.forEach(function (user) {
                if (user.id === data.toUser || user.id === data.fromUser) {
                    user.socket.emit('receive', data);
                }
            })
        } else {
            io.sockets.emit('receive', data);
        }
    });
});


//We should also notify the people in the chat about the available users.
var sendUsers = function () {
    io.sockets.emit('users', users.map(function (user) {
        return { id: user.id, name: user.username };
    }));
}

var setUsername = function (id, name) {
    /**
     * The subsequent lines check whether there is a toUser property. If there is one, we
        know that it contains IDs of some of the other users.
     */
    users.forEach(function (user) {
        if (user.id === id) {
            user.username = name;
            sendUsers();
        }
    });
}
