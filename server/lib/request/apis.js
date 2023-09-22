
/**
    Data Provider REST API Configuration
    ---------------------------------------------------------------------------
    A configuration object may consist of the following:
    
    - base: name of parent configuration (if any)
    - method: the REST method used
    - url: the request URL
    - headers: http request headers
    - data: request data
    - defarg: name of the primary parameter for the request
    - batch: max number of individual items to be reqested per call
    - path: path to the requested data in response
    - api: name of the api configuration to use
    - paging
      - name: name of paging query parameter
      - limit_name: name of page limit query parameter
      - limit: number of records returned per page
      - type: `0` or `1`; increment by `limit` (offset) or `1` (page)
    - vars: static interpolation values
    - retries: max number of times to retry request on failure
    
    Any config object specifying `base` will be merged with the specified 
    config.
    
    Interpolation:
    Enclose names in braces (`{}`) in `url`, `headers`, and `data` elements to 
    have those values injected via `vars` or other values provided at runtime.
    
*/
module.exports =
{
    blockfrost:
    {
        method: 'get',
        url: 'https://cardano-mainnet.blockfrost.io/api/v0',
        headers: { project_id: '{apikey}' },
        defarg: 'default',
        path: 'data',
        api: 'blockfrost',
        paging: { limit: 100, type: 1 }
    },
    
    koios:
    {
        method: 'get',
        url: 'https://api.koios.rest/api/v0',
        headers: { authorization: 'Bearer {apikey}' },
        defarg: 'default',
        path: 'data',
        api: 'koios',
        paging: { limit: 800, type: 0 }
    },
    
    opencnft:
    {
        method: 'get',
        url: 'https://api.opencnft.io/{version}',
        headers: { 'X-Api-Key': '{apikey}' },
        defarg: 'default',
        path: 'data',
        api: 'opencnft',
        vars: { version: '2' }
    },
    
    /* --------------------------------------------------------------------- */
    
    account: { base: 'blockfrost', url: '/accounts/{account}', defarg: 'account' },
        
    accountAssets:
    {
        base: 'koios',
        method: 'post',
        url: '/account_assets?limit={limit}&offset={offset}',
        path: [ 0, 'asset_list' ],
        data: { _stake_addresses: [ '{account}' ] },
        paging: { limit_name: 'limit', name: 'offset' }
    }, 

    adaHandle:
    {
        base: 'blockfrost',
        url: '/assets/{policy}{adaHandle}/addresses',
        path: [ 0, 'address' ],
        vars: { policy: 'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a' }
    },
    
    address: { base: 'blockfrost', url: '/addresses/{address}', path: 'stake_address' },
                        
    asset: { base: 'blockfrost', url: '/assets/{asset}' },

    assetAddress: { base: 'asset', url: '/addresses' },
    
    assetList: { base: 'koios', method: 'post', url: '/asset_info', defarg: 'data._asset_list', batch: 200 },

    collection: { base: 'opencnft', url: '/collection/search?q={policy}' },
        
    eras: { base: 'blockfrost', url: '/network/eras' },

    genesis: { base: 'blockfrost', url: '/genesis' },    
    
    pool: { base: 'blockfrost', url: '/pools/{pool_id}/metadata' },
        
    transaction: { base: 'blockfrost', url: '/txs/{hash}' }
}
