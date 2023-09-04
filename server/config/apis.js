var { apikey } = require('./');


module.exports =
{
    blockfrost:
    {
        method: 'get',
        url: 'https://cardano-mainnet.blockfrost.io/api/v0',
        headers: 
        { 
            project_id: apikey.blockfrost
        },
        root: 'data',        
        error_codes:
        {
            // when the request is not valid
            '400': 'Invalid request.',
            // when the projects exceed their daily request limit
            '402': 'Daily request limit exceeded.',
            // when the request is not authenticated
            '403': 'Unauthenticated request.',
            // when the resource doesn't exist
            '404': 'Resource does not exist.',
            // when the user has been auto-banned for flooding too much after 
            // previously receiving error code 402 or 429
            '418': 'Auto-banned user.',
            // when the user has sent too many requests in a given amount of 
            // time and therefore has been rate-limited
            '429': 'Too many requests (rate-limited).',
            // when our endpoints are having a problem
            '500': 'Internal server issue.'
        }
    },
    
    opencnft:
    {
        method: 'get',
        url: 'https://api.opencnft.io/{version}',
        headers: 
        { 
            'X-Api-Key': apikey.opencnft
        },
        root: 'data',
        vars:
        {
            version: '2'
        },
        throttle: 'opencnft'
    },
    
    account:
    {
        base: 'blockfrost',
        url: '/accounts/{account}'
    },
    
    accountAssets:
    {
        base: 'account',
        url: '/addresses/assets?page={page}',
        vars:
        {
            page: 1
        }
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
    
    collection:
    {
        base: 'opencnft',
        url: '/collection/search?q={policy}'
    },
    
    collectionMetrics:
    {
        base: 'opencnft',
        url: '/collection/{policy}'
    },
    
    genesis:
    {
        base: 'blockfrost',
        url: '/genesis'
    },
    
    eras:
    {
        base: 'blockfrost',
        url: '/network/eras'
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
    },
    
    transaction:
    {
        base: 'blockfrost',
        url: '/txs/{hash}'
    }
}
