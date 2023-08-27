var e = require('./entities');


module.exports = async function(input)
{
    var getData = stake => Promise.all([ stake, e.account(stake.stakeKey), e.assets(stake.stakeKey) ])
    
    var assembleData = ([ stake, account, assets ]) =>
    {
        var nfts = assets.filter(i => i.isNFT);

        return e.collections(nfts).then(collections => 
        ({ 
            ...account, 
            input: stake.input, 
            tokens: assets.filter(i => !i.isNFT), 
            collections, 
            nfts 
        }));
    }
      
    return e.stake(input).then(getData).then(assembleData);  
}
