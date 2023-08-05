var express = require('express');
var app = express();
var paths = require('../paths');


var port = 8080;

app.use('/', express.static(paths.public));

app.listen(port, () => 
{
    console.log(`ApexView app now listening on port ${port}.`)
});
