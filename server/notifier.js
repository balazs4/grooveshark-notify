var notifier = require('node-notifier');
var fs = require('fs');
var path = require('path');
var os = require('os');

require('date-utils');

function base64ToImage(raw, name, callback) {
    var coverPath = path.join(os.tmpdir(), name + ".png");
    var base64 = raw.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(coverPath, base64, 'base64', function(err) {
        callback(coverPath);
    });
}

function dateTimeToFormat() {
    return new Date().toFormat('YYYY-MM-DD | HH24:MI:SS');
}

function sendNotification(song, service) {
    try {
        console.log("[%s] '%s' by '%s' from '%s'", dateTimeToFormat(), song.title, song.artist, song.album);

        base64ToImage(song.cover, service, function(coverFile) {
            notifier.notify({
                "title": song.title,
                "message": "by '" + song.artist + "'\nfrom '" + song.album + "'",
                "icon": coverFile
            });
        });

    } catch (err) {
        console.error(err);
    }
}


module.exports = sendNotification;