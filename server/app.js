var express = require('express');
var bodyParser = require('body-parser');
var gulp = require('gulp');
var notify = require("gulp-notify");
var fs = require('fs');
var http = require('http');
var path = require('path');
var os = require('os');


var app = express();

app.use(bodyParser.urlencoded(
{
    extended: true
}));


function base64ToImage(raw, callback)
{
    var coverPath = path.join(os.tmpdir(), "cover.jpg");
    var base64 = raw.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile(coverPath, base64, 'base64', function(err)
    {
        callback(coverPath);
    });
}




var prevoiousSongId = 0;

app.route('/grooveshark')
    .post(function(req, res)
    {
        var song = req.body;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.status(200).end();

        if (!song || !song.songID || prevoiousSongId == song.songID)
        {
            return;
        }

        console.log("Song changed...");
        prevoiousSongId = song.songID;


        base64ToImage(song.cover, function(coverFile)
        {
            gulp.src(coverFile)
                .pipe(notify(
                {
                    "title": song.songName,
                    "message": "by '" + song.artistName + "'\nfrom '" + song.albumName + "'",
                    "icon": coverFile
                }));
        });
    });


var port = 4444;
app.listen(port);
console.log("Server is listening on http://" + os.hostname() + ":" + port);
