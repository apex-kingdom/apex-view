var { encode } = require('hex-encode-decode');


module.exports =
{
    blockfrost:
    {
        method: 'get',
        url: 'https://cardano-mainnet.blockfrost.io/api/v0',
        headers: 
        { 
            project_id: process.env.API_BLOCKFROST
        },
        root: 'data'
    },
    
    account:
    {
        base: 'blockfrost',
        url: '/accounts/{account}'
    },
    
    accountAssets:
    {
        base: 'account',
        url: '/addresses/assets'
    },
    
    adaHandle:
    {
        base: 'blockfrost',
        url: '/assets/{policy}{adaHandle}/addresses',
        paths:
        { 
            address: '0.address'
        },
        vars:
        {
            policy: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a'
        },
        preps:
        {
            adaHandle: value => encode(value.replace(/^\$/, ''))
        }
    },
    
    address:
    {
        base: 'blockfrost',
        url: '/addresses/{address}',
        paths:
        { 
            stakeKey: 'stake_address'
        }
    },        
                        
    asset:
    {
        base: 'blockfrost',
        url: '/assets/{asset}'
    },
        
    assetAddress:
    {
        base: 'asset',
        url: '/addresses'
    },
    
    policy:
    {
        base: 'asset',
        url: '/{policy}',
        vars:
        {
            asset: 'policy'
        }
    },
    
    poolMeta:
    {
        base: 'blockfrost',
        url: '/pools/{poolMeta}/metadata'
    },
    
    scriptJson:
    {
        base: 'blockfrost',
        url: '/scripts/{hash}/json'
    }
}
