var cdata = require('./request/puller');
var account = require('./entities/account');


/**
    Builds root object for Cardano account data.
    
    @param { string } input
      Can be a stake key, address, or handle.
    @param { boolean } clear
      Clear data before retrieval?
*/
module.exports = function get(input)
{
    let wallet = account(input); 
    
    let batch = resolveInput(input).then(key => 
    {
        let detailsPromise = cdata.account(key)
            .then(data => (wallet.setData(data), data))
            .then(data => data.pool_id && cdata.poolMeta(data.pool_id).then(wallet.setPool));
            
        let assetsPromise = cdata.accountAssets(key).then(array => 
        {
            let list = array.map(a => 
            {
                return cdata.asset(a.unit).then
                (
                    i => cdata.transaction(i.initial_mint_tx_hash).then
                    (
                        t => wallet.addToken(a, i, t)
                    )
                ); 
            });
            
            return Promise.all(list);
        });
            
        return Promise.all([ detailsPromise, assetsPromise ]);
    });
    
    return batch.then(() => wallet.get());
}

async function resolveInput(key) 
{
    if (/^\$/.test(key)) // resolve handle to address
        return cdata.adaHandle(key, 'address').then(resolveInput);
    else if (!/^stake/.test(key)) // resolve address to staking key
        return cdata.address(key, 'stakeKey').then(resolveInput);
    // we should have a staking key here
    return key;
}
