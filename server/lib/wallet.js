var e = require('./entities');


module.exports = async function(input)
{
    var getData = stake => Promise.all(
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
                return e.token(data.unit)
                    // .then(token => e.tx(token.mintTx).then(data => token))
                    .then(token => e.asset(data, token))
            }))
        }) 
    ])
    
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
