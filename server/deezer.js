var service = {
    name: "deezer",
    getSong: function(raw) {
        return {
            id: raw.SNG_ID,
            title: raw.SNG_TITLE,
            artist: raw.ART_NAME,
            album: raw.ALB_TITLE,
            cover: raw.ALB_IMG
        }
    }
};

module.exports = function(app, notify) {
    app.post("/" + service.name, function(req, res) {
        notify(service.getSong(req.body), service.name);
    });
}
