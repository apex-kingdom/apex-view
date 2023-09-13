var nf = require('../num-format');


var reCut = /\s*#.*$/;
/**
    Builds collection entities for an account.
    
    @param { function } base
      Async function from which to get base collection data.
    @return { promise }
      Object of collections keyed by policy id.
*/
module.exports = function(base)
{
    var collections = {}, requests = {}, cname = {};
    
    var add = async asset =>
    {
        var { policyId } = asset;        
        
        return base.fromCache(policyId).then(data =>
        {
            var collection = collections[policyId] || { __entity: 'collection', policyId };
            
            if (!data && !requests[policyId])
            {
                // request collection information if we haven't already (for caching 
                // purposes)... but we're not waiting for it
                requests[policyId] = base.request(policyId);
                // instead we can inform client how to get this data
                collection.__extra = ['/collection', { policyId }];
            }
            else
            {
                collection = { ...collection, ...data };
            }            
          
            if (!collection.name) collection.name = asset.project;
            if (!collection.description) collection.description = asset.description;
          
            if (!collection.mintTime || collection.mintTime > asset.mintTime)             
            {
                collection.image = asset.image;
                collection.imageType = asset.imageType;
                collection.mintTime = asset.mintTime;
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
            
            cname[policyId] = common(cname[policyId], asset.name);
            
            return collections[policyId] = collection;
        });      
    }
    
    var get = () =>
    {
        return Object.keys(collections).map(key => 
        {
            let collection = collections[key];
          
            collection.userQuantityFormatted = nf(collection.userQuantity);
            
            if (!collection.name)
            {
                if (cname[key] && collection.userQuantity > 1) 
                    collection.name = cname[key].replace(reCut, '');
                else 
                    collection.name = '?????';
            }
            
            return collection;
        });
    }
    
    return { add, get };
}


function common(og, name)
{
    if (og && name)
    {
        var index = 0;
        
        while(index < og.length && og[index] === name[index]) index++;
        
        return og.slice(0, index);
    }
    
    return og || name;
}
