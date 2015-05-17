var app = require('express')();
var notify = require('./notifier');

require('./bodyparser')(app);
require('./quickresponse')(app);

require('./deezer')(app, notify);
//require('./grooveshark')(app,notify);

require('./start')(app, 4444);