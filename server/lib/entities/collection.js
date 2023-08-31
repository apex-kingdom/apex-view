var pull = require('../request');
var { prod } = require('../../config');


/**
    Gets collection details for the given policy id.
    
    @param { string } policyId
      Policy Id for the collection to be retrieved.
    @return { promise }
      Resolves to a "collection" object.
*/
module.exports = async function(policyId)
{
    var collection = { __entity: 'collection' };
        
    return pull.collection(policyId).then(([ data ]) => 
    {
        if (!data) return { ...collection, policyId };
        
        if (!prod) collection.__raw = data;

        collection.policyId = policyId;
        collection.name = data.project;
                
        return collection;
    });
}
