
/**
    Filter and flatten object values.
*/
export default function(source, test = () => true)
{
    let filter = (obj, pre) =>
    {
        let result = {};
        
        Object.keys(obj).forEach(key =>
        {
            let name = pre ? [ ...pre, key ] : [ key ];
          
            if (test(name, obj[key]))
            {
                if (typeof obj[key] === 'object')
                    result = { ...result, ...filter(obj[key], name) };
                else
                    result[name.join('.')] = obj[key];
            }
        });
        
        return result;
    }
        
    return filter(source);
}
