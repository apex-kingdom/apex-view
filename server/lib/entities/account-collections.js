var numeral = require('numeral');


/**
    Builds collection entities for an account.
    
    @param { function } base
      Async function from which to get base collection data.
    @return { promise }
      Object of collections keyed by policy id.
*/
module.exports = function(base)
{
    var collections = {};
    
    var add = async asset =>
    {
        var { policyId } = asset;
        // if we already have a collection or a pending promise for it,
        // do not send for the data
        collections[policyId] = Promise.resolve(collections[policyId] || base(policyId));
        
        return collections[policyId].then(collection =>
        {
            if (!collection.name) collection.name = asset.project || asset.name;
          
            if (!collection.image)             
            {
                collection.image = asset.image;
                collection.imageType = asset.imageType;
            }
          
            collection.userQuantity = (collection.userQuantity || 0) + 1;
            
            var reducer = (obj, key) => 
            {
                var val = asset.traits[key];
                
                obj[key] = obj[key] || {};
                obj[key][val] = (obj[key][val] || 0) + 1;
                                      
                return obj;
            }
            
            collection.traits = Object.keys(asset.traits).reduce(reducer, collection.traits || {});
            
            return collections[policyId] = collection;
        });      
    }
    
    var get = () =>
    {
        return Object.values(collections).map(collection => 
        {
            collection.userQuantityFormatted = numeral(collection.userQuantity).format('0,0'); 
            return collection;
        });
    }
    
    return { add, get };
}
