import numeral from 'numeral'
import token from './token'


export default function()
{
    let collections = {};
    
    let getCollection = data =>
    {
        let { policyId } = data;
      
        if (!collections[policyId])
        {
            let collection = {};
            
            collection.isCollection = true;
            collection.policyId = policyId;
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
            
            collections[policyId] = collection;
        }
        
        return collections[policyId];
    }
    
    
    let addToken = data =>
    {
        // homogenize the token data
        if (!data.__token) data = token(data);
        
        let collection = getCollection(data);
        
        collection.userQuantity++;
        
        if (!collection.collectionName)
        {
            // sometimes bad data here so check for string
            if (data.project && typeof data.project === 'string')
                collection.collectionName = data.project;
            else if (data.assetBaseName)
                collection.collectionName = data.assetBaseName;            
        }
        
        collection.commonName = commonStart(collection.commonName, data.name);
        
        let reducer = (obj, key) => 
        {
            let val = data.traits[key];
            
            obj[key] = obj[key] || {};
            obj[key][val] = (obj[key][val] || 0) + 1;
                                  
            return obj;
        }
        
        Object.keys(data.traits).reduce(reducer, collection.traits);
        
        return data;
    }
    
    return { addToken, values: () => Object.values(collections) };
}


function commonStart(str1, str2)
{
    if (str1 == str2 || !str1) return str2;
    let index = 0, chars = '';
    
    while (index < str1.length && str1.charAt(index) === str2.charAt(index))
    {
        chars += (str1.charAt(index));
        index++;
    }
    
    return chars;
}
