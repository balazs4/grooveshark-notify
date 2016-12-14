module.exports = function(app) {
    var options = {
        limit: '1mb',
        extended: true
    };
    app.use(require('body-parser').urlencoded(options));
    app.use(require('body-parser').json(options));
};
