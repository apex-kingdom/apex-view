var express = require('express');
var wallet = require('../lib/wallet');
var { collection } = require('../lib/adapters');
var paths = require('../../paths');
 

var router = express.Router();
// server health check
router.get('/health', (req, res) => 
{
    res.send('ApexView server is here! ' + Math.floor(Math.random() * 100000).toString(16));
});
// get wallet data based on address, handle, or staking key
router.get('/wallet/:input', (req, res, next) => 
{    
    wallet(req.params.input).then(data => res.send(data)).catch(next);
});
// get NFT collection data based on list of policy Ids
router.post('/collection', (req, res, next) => 
{    
    collection(req.body.policyId).then(data => res.send(data)).catch(next);
});
// all other roads lead to SPA
router.get('/*', (req, res) => 
{
    res.sendFile(paths.sub(paths.public)('index.html'));
});

module.exports = router;
