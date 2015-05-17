module.exports = function(app, port) {
    app.listen(port, function() {
        console.log("Server is listening on http://localhost:" + port);
    });
};
