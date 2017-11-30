var flickr = require('./lib/Flickr');
var files = require('./lib/Files');
var flickrOptions = {};
files(function (images) {
    flickr(flickrOptions, images, function () {
        console.log("All the images uploaded.");
        process.exit(1);
    })
});

var fs = require('fs');
var argv = require('optimist').argv;
var readline = require('readline');
var glob = require('glob');
var currentDirectory = process.cwd() + '/';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});