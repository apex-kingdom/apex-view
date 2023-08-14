var express = require('express');
var app = express();
var router = require('./router');
var paths = require('../paths');



app.use('/', express.static(paths.public));
app.use(router);

var port = process.env.PORT || 3000;

app.listen(port, () => 
{
    console.log(`ApexView app now listening on port ${port}.`)
});
