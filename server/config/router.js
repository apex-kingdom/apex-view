var express = require('express');
var wallet = require('../lib/wallet');
var paths = require('../../paths');
 

var router = express.Router();
// wallet data request
router.get('/wallet/:input', (req, res, next) => 
{    
    wallet(req.params.input).then(data => res.send(data)).catch(next);
});
// all other roads lead to SPA
router.get('/*', (req, res) => 
{
    res.sendFile(paths.sub(paths.public)('index.html'));
});

module.exports = router;
