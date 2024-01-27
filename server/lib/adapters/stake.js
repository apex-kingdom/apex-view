var at = require('../seconds');
var get = require('../request');
var { encode } = require('hex-encode-decode');


var reHandle = /^\$/;
var reStake = /^stake/;
var __entity = 'stake';
/**
    Transforms raw api data into ApexView entity data.
    
    @param { object } data
      Raw api data
    @return { object }
      Entity data.
*/
var adapter =
{
    apiName: input => resolve(input).then(stakeKey => ({ input, stakeKey })),
    
    cacheExp: at(1).minutes,
    
    getKey: source => source.input || source,
    
    entity: function(data)
    {
        let stake = { __entity };
        
        stake.input = data.input;
        stake.stakeKey = data.stakeKey;
        
        return stake;
    }
}

module.exports = adapter;


async function resolve(input)
{
    // resolve handle to address
    if (reHandle.test(input)) return resolveHandle(input).then(resolve);
    // resolve address to staking key
    else if (!reStake.test(input)) return get.address(input).then(resolve);
    // we should have a staking key here
    return input;
}


async function resolveHandle(input)
{
    let handleEnc = encode(input.replace(/^\$/, ''));
    
    return get.adaHandle(handleEnc).catch(error =>
    {
        var { response: { status = 0 } = {} } = error;
        
        if (status === 404)
        {
            // try again specifying for potential cip68 handle
            return get.adaHandle('000de140' + handleEnc);
        }
    });
}
