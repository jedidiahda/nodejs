const express = require('express')

const mysql = require('mysql');
const fetch = require('node-fetch');
const app = express()
const port = 3000




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "crypefhy_bitcoindb"
});

// con.connect(function(err) {
//   if (err) throw err;  
//   console.log("Connected!");
// });

const gql = ({ query, variables }) => {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJzaW9uIjoxLCJ0b2tlbklkIjoiNmYzNzlmMzgtNzI1NC00MGIzLTkxMGItNjc5ODk0NGZiYTdlIn0.lj9gsjmCjLoEhxy7RwNLFMlkosdPvrVSZAF8kusYbC0'
    return fetch('https://api-apeast.graphcms.com/v1/cjttdugp21u1t01dva4dmkoq5/master', {
      method: 'POST',
      headers: { 
        'content-type':   'application/json',
        'authorization':  `Bearer ${token}`
      },
      body: JSON.stringify({ query, variables })
    })
    .then( res => res.json() )
    .then( json => {
      if(json.errors){
        const error = json.errors.shift();
          
        throw error.functionError || error.message || error;
      }
      return json.data 
    })
    .then( data => {
      const keys = Object.keys(data);
      return keys.length && data[keys.shift()];
    })
    .catch( error => {
      console.warn(error);
      return { error };
    })
  }


app.get('/', (req, res) =>{
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM wp1u_posts where post_content != ''", function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
          var arr = [];
    
          result.forEach((element,i) => {
            //   arr.push({
            //       title: element.post_title,
            //       body: element.post_content,
            //       link: element.guid,
            //       author: element.post_name,
            //       publishdate: element.post_date,
            //       imageurl: '',              
            //   });             


              let variables = {
                title: element.post_title,
                body: element.post_content,
                link: element.guid,
                author: element.post_name,
                publishdate: element.post_date,
                imageurl: '',              
            }
        
              gql({
                variables,
                query:`
                mutation(
                    $imageurl:String!
                    $link:String!
                    $title:String!
                    $body:String!
                    $publishdate:DateTime!
                    $author:String!
                ){
                    createArticle(
                      data:{
                        imageurl:$imageurl
                        link: $link
                        title: $title
                        body:$body
                        publishdate: $publishdate
                        author:$author
                      }
                    ){
                      id
                      imageurl
                      link
                      title
                      body
                      author
                      publishdate
                    }
                  }
                `
              }).then(data => {
                console.log(data)
              });


              //console.log(arr);
          });



          res.send("");
    
        });
    });

    
});





app.listen(port, () => console.log(`Example app listening on port ${port}!`))