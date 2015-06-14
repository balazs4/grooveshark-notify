module.exports = {
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
