function imageTobase64(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
        callback(dataURL);
        // Clean up
        canvas = null;
    };
    img.src = url;
}


function onSongStatusChanged(data) {
    var song = data.song;
    imageTobase64(song.artURL, function(base64) {
        song.cover = base64;
        $.post("http://localhost:4444/grooveshark", song);
    });
}

function registerCallbacks() {
    window.Grooveshark.setSongStatusCallback(onSongStatusChanged);
    console.log("Grooveshark callback registered!");
}

console.log("Injected grooveshark.js");
setTimeout(registerCallbacks, 8000);
