var express = require('express');
var bodyParser = require('body-parser');
var notifier = require('node-notifier');
var fs = require('fs');
var http = require('http');
var path = require('path');
var os = require('os');
var datetime = require('date-stylish');


var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));


function base64ToImage(raw, callback) {
    var coverPath = path.join(os.tmpdir(), "cover.jpg");
    var base64 = raw.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile(coverPath, base64, 'base64', function(err) {
        callback(coverPath);
    });
}


var prevoiousSongId = 0;

app.route('/grooveshark')
    .post(function(req, res) {
        var song = req.body;

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.status(200).end();

        if (!song || !song.songID || prevoiousSongId == song.songID) {
            return;
        }



        console.log("[%s] '%s' by '%s' from '%s'", datetime.now, song.songName, song.artistName, song.albumName);
        prevoiousSongId = song.songID;


        base64ToImage(song.cover, function(coverFile) {
            notifier.notify({
                "title": song.songName,
                "message": "by '" + song.artistName + "'\nfrom '" + song.albumName + "'",
                "icon": coverFile
            });
        });
    });


var port = 4444;
app.listen(port);
console.log("Server is listening on http://" + os.hostname() + ":" + port);
