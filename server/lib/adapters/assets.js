var at = require('../seconds');
var nf = require('../num-format');
var { getKey } = require('./token');


var __entity = 'account-assets';
/**
    Transforms raw api data into ApexView entity data.
    
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
var adapter =
{
    apiName: 'accountAssets',
    
    cacheExp: at(1).minutes,
    
    getKey: source =>
    {
        if (source.__entity === __entity)
            return source.stakeKey;
        
        return source.stake_address;
    },
    
    entity: function(data)
    {    
        var assets = { __entity };

        assets.stakeKey = data.stake_address;
        
        assets.ids = [];
        assets.map = {};

        data.asset_list.forEach(item => 
        {
            var key = getKey(item);
            
            assets.ids.push(key);
            assets.map[key.join('')] = item;
        });
        
        return assets;
    }    
}

module.exports = adapter;
