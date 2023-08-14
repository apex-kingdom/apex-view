var numeral = require('numeral');
var pull = require('../request');
var loop = require('../loop');
var pool = require('./pool');


/**
    Gets the wallet for the given staking key.
    
    @param { string } stakeKey
      Staking key for the wallet to be retrieved.
    @return { promise }
      Resolves to a "account" object.
*/
module.exports = async function(stakeKey)
{
    var account = { __entity: 'account' };
    
    return pull.account(stakeKey).then(data => 
    {
        account.active = data.active;
        
        account.ada = numeral(data.controlled_amount).value();
        account.adaAdjusted = loop(6).reduce(v => v * .1, account.ada);
        account.adaFormatted = numeral(account.adaAdjusted).format('0,0');
           
        account.stakeKey = data.stake_address;

        account.walletType = data.type;
        
        return pool(data.pool_id).then(data => 
        {
            account.pool = data;
            return account;
        });
    });
}
