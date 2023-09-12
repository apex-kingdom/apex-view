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
    
    return Promise.all(
    [
        pull.collection(policyId),
        // pull.collectionMetrics(policyId)
    ])
    .then(([ search, metrics = {} ]) => 
    {
        let [ result = {} ] = search, { collection: names = {} } = metrics;        

        if (!prod) collection.__raw = { search, metrics };

        collection.policyId = policyId;
        // it appears opencnft api will return a random selection of policy 
        // information if exact policy id cannot be found (shrug)
        if ((result.policies || [])[0] === policyId)
        {
            collection.name = result.project;            
        }
        // collection.name = names.name || result.project;
        // collection.soldCount = metrics.total_nfts_sold;
        // collection.holders = metrics.holders;
                
        return collection;
    });
}
