var md5 = require('MD5');

module.exports = {
    name: "radio",

    fallbackcover: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",

    getSong: function(raw) {
        if (raw.info) {
            return {
                "id": md5(raw.info + raw.source),
                "title": raw.source,
                "artist": "",
                "album": raw.info,
                "cover": this.fallbackcover
            }
        } else {
            return {
                "id": md5(raw.title + raw.artist + raw.source),
                "title": raw.title,
                "artist": raw.artist,
                "album": raw.album + " (" + raw.source + ")",
                "cover": this.fallbackcover
            }
        }

    }
};
