var express = require('express');
var e = require('./lib/entities');
var paths = require('../paths');
 

var port = process.env.PORT || 3000;
var router = express.Router();
// wallet data request
router.get('/wallet/:input', (req, res, next) => 
{
    var { input } = req.params;
    
    e.stake(input)
        .then(stake => Promise.all([ stake, e.account(stake.stakeKey), e.assets(stake.stakeKey) ]))
        .then(([ stake, account, assets ]) => 
        {
            var { input } = stake;
            var nfts = assets.filter(i => i.isNFT);
            var tokens = assets.filter(i => !i.isNFT);
            
            e.collections(nfts).then(collections => 
            {              
                res.send({ ...account, input, tokens, collections, nfts });              
            });
        })
        .catch(next);
});
// all other roads lead to SPA
router.get('/w/*', (req, res) => 
{
    res.sendFile(paths.sub(paths.public)('index.html'));
});

module.exports = router;
