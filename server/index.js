var app = require('express')();
var notify = require('./notifier');

require('./express/bodyparser')(app);

require('./express/quickresponse')(app);

require('./services')(app, notify);

require('./express/start')(app, 4444);