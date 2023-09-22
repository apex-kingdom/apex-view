var at = require('../seconds');


/**
    Transforms raw api data into ApexView entity data.
    
    Genesis entity data fields:    
    - systemStart
    - epochLen
    
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
exports.entity = function(data)
{
    var genesis = { __entity: 'genesis' };
    
    genesis.systemStart = data.system_start;
    genesis.epochLen = data.epoch_length;

    return genesis;
}

exports.apiName = 'genesis';
exports.cacheExp = at(1).months;
