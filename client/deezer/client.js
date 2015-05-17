function imageTobase64(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL('image/jpg');
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function onSongChange(mutationRecords) {
    var coverUrl = $("#player .player-cover img").attr("src");

    imageTobase64(coverUrl, function(base64) {
        var track = dzPlayer.getCurrentSong();
        track.ALB_IMG = base64;
        $.post("http://localhost:4444/deezer", track);
    });
}

function registerObservation() {
    var observer = new window.MutationObserver(onSongChange);
    $("#player .player-track").each(function() {
        observer.observe(this, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true
        });
        console.info("[deezer-notify-client] Listening...");
    });
}

setTimeout(registerObservation, 2000);