var e = require('./entities');


module.exports = async function(input)
{
    var getData = ([ chain, stake ]) => Promise.all(
    [
        stake, 
        e.account(stake.stakeKey).then(account => 
        {
            return e.pool(account.poolId).then(pool => ({ ...account, pool }));
        }), 
        e.assets(stake.stakeKey).then(array => 
        {
            return Promise.all(array.map(data => 
            {                
                return e.token(data.unit, hash => e.tx(hash, chain)).then(token => e.asset(data, token));
            }));
        }) 
    ])
    
    var assembleData = ([ stake, account, assets ]) =>
    {
        assets.sort((a, b) => a.mintTime - b.mintTime);
      
        var nfts = assets.filter(i => i.isNFT);
        var collections = e.accountCollections(e.collection);

        return Promise.all(nfts.map(collections.add)).then(() => 
        ({ 
            ...account, 
            input: stake.input, 
            tokens: assets.filter(i => !i.isNFT), 
            collections: collections.get().sort((a, b) => a.firstMintTime - b.firstMintTime), 
            nfts 
        }));
    }
      
    return Promise.all([ e.chain(), e.stake(input) ]).then(getData).then(assembleData);  
}
