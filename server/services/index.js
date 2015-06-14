var fs = require('fs');
var path = require('path');
var linq = require('linq');

var setup = function(app, notify) {
    var files = fs.readdirSync(__dirname);

    linq
        .from(files)
        .where(function(file) {
            return file != path.basename(__filename);
        })
        .forEach(function(value, index) {
            var service = require("./" + path.basename(value, ".js"));

            app.post("/" + service.name, function(req, res) {
                notify(service.getSong(req.body), service.name);
            });

            console.log("Registered '" + service.name + "'")
        });
};


module.exports = setup;
