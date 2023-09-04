var express = require('express');
var app = express();
var router = require('./config/router');
var paths = require('../paths');
var { port } = require('./config');


app.use('/pub', express.static(paths.public));
app.use(router);

app.listen(port, () => 
{
    console.log(`ApexView app now listening on port ${port}.`)
});
