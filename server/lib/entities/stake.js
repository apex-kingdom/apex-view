var pull = require('../request');


var reHandle = /^\$/;
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
    stake.inputType = type(input);
    
    return resolve(input).then(stakeKey => ({ ...stake, stakeKey }));
}


async function resolve(input)
{
    // resolve handle to address
    if (reHandle.test(input)) return pull.adaHandle(input, 'address').then(resolve);
    // resolve address to staking key
    else if (!/^stake/.test(input)) return pull.address(input, 'stakeKey').then(resolve);
    // we should have a staking key here
    return input;
}


function type(input)
{
    if (/^\$/.test(input)) return 'handle'; // handle
    if (/^stake/.test(input)) return 'staking'; // stake key
    
    return 'address'; // address
}
