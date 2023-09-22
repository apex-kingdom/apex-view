var at = require('../seconds');
var { prod } = require('../../config');


/**
    Transforms raw api data into ApexView entity data.
    
    Collection entity data fields:    
    - name (string)
    - policyId (string)
    
    @param { object } data
      Raw api data.
    @return { object }
      Entity data.
*/
exports.entity = function(data, policyId)
{
    var collection = { __entity: 'collection' };
    
    collection.policyId = policyId;

    let [ result = {} ] = data;           
    // it appears opencnft api will return a random selection of policy 
    // information if exact policy id cannot be found (shrug)
    if ((result.policies || [])[0] === policyId)
    {
        collection.name = result.project;            
    }
    
    return collection;
}

exports.apiName = 'collection';
exports.cacheExp = at(1).weeks;
