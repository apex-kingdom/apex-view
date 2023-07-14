import { decode } from 'hex-encode-decode'
import numeral from 'numeral'
import cdata from '../chain-data'


/**
    Builds root object for Cardano account data.
    
    @param { string } input
      Can be a stake key, address, or handle.
*/
export default function get(input)
{
    let account = 
    { 
        address: input, 
        inputType: type(input), 
        tokens: [], 
        nfts: [], 
        collections: []
    };
    
    let batch = resolveInput(input).then(key => 
    {            
        return Promise.all(
        [
            // get wallet data via stakekey
            cdata.account(key).then(dets => 
            {
                account.active = dets.active;
                account.ada = numeral(numeral(dets.controlled_amount).multiply(10 ** -6)).format('0,0');
                account.stakeKey = dets.stake_address;
                account.walletType = dets.type;
                // get stake pool ticker
                if (dets.pool_id)
                {
                    return cdata.poolMeta(dets.pool_id).then(data => account.stakePool = data.ticker);
                }
            }),
            // grab nfts and tokens
            cdata.accountAssets(key).then(data => 
            {
                let policies = [];
                let { tokens, nfts, collections } = account;
              
                return Promise.all(data.map
                (
                    asset => cdata.asset(asset.unit).then(info =>
                    {
                        let data = assembleToken(asset, info);
                        let { isNFT, onchain_metadata, policy_id } = data;
                        
                        (isNFT ? nfts : tokens).push(data);
                        
                        if (isNFT)
                        {
                            if (policy_id && !policies.includes(policy_id))
                            {
                                policies.push(policy_id);
                                // first NFT pulled represents the collection
                                collections.push({ ...data, user_quantity: 0 });
                            }
                            
                            let idx = policies.indexOf(policy_id);
                            collections[idx].user_quantity++;
                            
                            if (onchain_metadata.project)
                                collections[idx].collection_name = onchain_metadata.project;
                            else
                                collections[idx].collection_name = 
                                    commonStart(collections[idx].collection_name, data.asset_name_dec)
                                    .replace(/\w*#$/, '');
                        }                        
                    })
                ));
            })
        ]); 
    });
    
    return batch.then(() => account);
}


function type(input)
{
    if (/^\$/.test(input)) return 'h'; // handle
    if (/^stake/.test(input)) return 's'; // stake key    
    return 'a'; // address
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


function assembleToken({ quantity }, details)
{
    let data = { ...details };
    let meta = data.metadata || {};
    let ocmd = data.onchain_metadata || {};
    // for now we will assume item is an NFT when 
    // `quantity` is 1. (other checks may be needed)
    data.isNFT = data.quantity == 1;
    // set wallet quantity
    let decimals = meta.decimals || 0;
    let adjusted = Array.apply(null, Array(decimals)).reduce(v => v * .1, numeral(quantity).value());
    let format = adjusted > 10 ? '0,0' : `0,0.[${'0'.repeat(decimals)}]`;

    data.user_quantity = numeral(adjusted).format(format);    
    data.asset_name_dec = ocmd.name || decode(data.asset_name);
    
    return data;
}


function commonStart(str1, str2)
{
    if (str1 == str2 || !str1) return str2;
    let index = 0, chars = '';
    
    while (index < str1.length && str1.charAt(index) === str2.charAt(index))
    {
        chars += (str1.charAt(index));
        index++;
    }
    
    return chars;
}
