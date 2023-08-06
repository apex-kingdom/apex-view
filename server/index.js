var express = require('express');
var path = require('path');
var app = express();
var paths = require('../paths');
var wallet = require('./lib/wallet');


var port = 8080;

app.use('/', express.static(paths.public));
// all roads lead to SPA
app.get('/w/*', (req, res) => 
{
    res.sendFile(path.join(paths.public, 'index.html'));
});
// wallet data request
app.get('/wallet/:input', (req, res, next) => 
{
    wallet(req.params.input).then(data => res.send(data)).catch(next);
})

app.listen(port, () => 
{
    console.log(`ApexView app now listening on port ${port}.`)
});
