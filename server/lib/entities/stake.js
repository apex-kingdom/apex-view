var pull = require('../request');
var { encode } = require('hex-encode-decode');


var reHandle = /^\$/;
var reStake = /^stake/;
/**
    Resolves the given input to a staking key.
    
    @param { string } input
      Address, $handle, or staking key to be resolved.
    @return { promise }
      Resolves to a "stake" object.
*/
module.exports = async function(input)
{
    let stake = { __entity: 'stake' };
    
    stake.input = input;
    
    return resolve(input).then(stakeKey => ({ ...stake, stakeKey }));
}


async function resolve(input)
{
    // resolve handle to address
    if (reHandle.test(input)) return pull.adaHandle(encode(input.replace(/^\$/, ''))).then(resolve);
    // resolve address to staking key
    else if (!reStake.test(input)) return pull.address(input).then(resolve);
    // we should have a staking key here
    return input;
}
