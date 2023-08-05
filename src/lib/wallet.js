import cdata, { clearDataCache } from './chain-data'
import { account } from './cartifacts'


/**
    Builds root object for Cardano account data.
    
    @param { string } input
      Can be a stake key, address, or handle.
    @param { boolean } clear
      Clear data before retrieval?
*/
export default function get(input, clear = false)
{
    let wallet = account(input); 
    
    if (clear) clearDataCache();
    
    let batch = resolveInput(input).then(key => 
    {
        let detailsPromise = cdata.account(key)
            .then(data => (wallet.setData(data), data))
            .then(data => data.pool_id && cdata.poolMeta(data.pool_id).then(wallet.setPool));
            
        let assetsPromise = cdata.accountAssets(key).then(array => 
        {
            let list = array.map(a => cdata.asset(a.unit).then(i => wallet.addToken(a, i)));
            
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
