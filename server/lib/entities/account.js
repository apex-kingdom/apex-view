var numeral = require('numeral');
var collection = require('./collection');
var pool = require('./pool');
var token = require('./token');


module.exports = function(input)
{
    let account = {};
    let groups = collection();

    account.input = input;
    account.inputType = type(input);
    account.tokens = [];
    account.nfts = [];
    
    Object.defineProperty(account, 'collections', { get: () => groups.values(), enumerable: true });         

    let addToken = (asset, info) =>
    {
        let data = token(asset, info);
        
        if (data.isNFT)
            account.nfts.push(groups.addToken(data));
        else
            account.tokens.push(data);
    }
    
    let setData = data =>
    {
        account.active = data.active;
        
        account.ada = numeral(data.controlled_amount).value();
        account.adaAdjusted = times(6).reduce(v => v * .1, account.ada);
        account.adaFormatted = numeral(account.adaAdjusted).format('0,0');
           
        account.stakeKey = data.stake_address;

        account.walletType = data.type;
    }
    
    let setPool = data =>
    {
        account.pool = pool(data);
    }
    
    return { addToken, setData, setPool, get: () => account };
}


function type(input)
{
    if (/^\$/.test(input)) return 'handle'; // handle
    if (/^stake/.test(input)) return 'staking'; // stake key
    
    return 'address'; // address
}


let times = num => Array.apply(null, Array(num))
