var at = require('../seconds');
var nf = require('../num-format');


/**
    Transforms raw api data into ApexView entity data.
    
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
exports.entity = function(data)
{    
    var assets = { __entity: 'account-assets' };
    
    assets.ids = [];
    assets.map = {};

    data.forEach(item => 
    {
        var { asset_name, policy_id, unit } = item;
        assets.ids.push(unit || [ policy_id, asset_name ])
        assets.map[unit || (policy_id + asset_name)] = item;
    });
    
    return assets;
}

exports.apiName = 'accountAssets';
exports.cacheExp = at(1).minutes;
