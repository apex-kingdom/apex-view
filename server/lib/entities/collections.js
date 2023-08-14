var numeral = require('numeral');
var assets = require('./assets');


/**
    Builds collection entities from the given asset array.
    
    @param { string } array
      Array of tokens from which the collections will be built.
    @return { promise }
      Object of collections keyed by policy id.
*/
module.exports = async function(array)
{
    var reducer = (collections, asset) => 
    {
        var { policyId } = asset;
        var collection = collections[policyId] || getCollection(asset);
        
        collection.userQuantity++;
        
        if (!collection.collectionName)
        {
            // sometimes bad data here so check for string
            if (asset.project && typeof asset.project === 'string')
                collection.collectionName = asset.project;
            else if (asset.assetBaseName)
                collection.collectionName = asset.assetBaseName;            
        }
        
        collection.commonName = commonStart(collection.commonName, asset.name);
        
        var traitReducer = (obj, key) => 
        {
            var val = asset.traits[key];
            
            obj[key] = obj[key] || {};
            obj[key][val] = (obj[key][val] || 0) + 1;
                                  
            return obj;
        }
        
        Object.keys(asset.traits).reduce(traitReducer, collection.traits);
        
        collections[policyId] = collection;
        
        return collections;
    }
    
    return Object.values(array.reduce(reducer, {}));
}


function getCollection(data)
{
    var collection = { __entity: 'collection' };
    
    collection.isCollection = true;
    collection.policyId = data.policyId;
    collection.image = data.image;
    collection.imageType = data.imageType;
    collection.userQuantity = 0;
    collection.traits = {};
    
    Object.defineProperty(collection, 'userQuantityFormatted', 
    { 
        get: () => numeral(collection.userQuantity).format('0,0'), 
        enumerable: true 
    });
    
    Object.defineProperty(collection, 'name', 
    { 
        get: () => collection.collectionName || collection.commonName, 
        enumerable: true 
    });
    
    return collection;
}


function commonStart(str1, str2)
{
    if (str1 == str2 || !str1) return str2;
    var index = 0, chars = '';
    
    while (index < str1.length && str1.charAt(index) === str2.charAt(index))
    {
        chars += (str1.charAt(index));
        index++;
    }
    
    return chars;
}
