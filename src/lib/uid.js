import shash from 'string-hash'


/**
    Generates a unique string id.
    
    Return value will be the same for the same input (including child values
    in arrays/objects).
    
    @param { any } values
      Value used to generate id.
    @return { string }
      A base32 string value.
*/
export default function(...values)
{
    return shash(String(uid(values))).toString(32);
}

function uid(value)
{
    if (Array.isArray(value)) 
        return value.map(uid).join();
        
    if (typeof value === 'object' && value !== null)
        return uid(Object.values(value));
    
    return value;
}
