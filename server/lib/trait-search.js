var objectFilter = require('./object-filter');


var reTrait = /(traits)|(attributes)|(features)/i;
var nonTraits = 
[   
    'description',
    'discord', 
    'files', 
    'github',
    'image', 
    'media', 
    'mediaType', 
    'name', 
    'project', 
    'projectName',
    'sha256',
    'twitter',
    'website',
];
var reNonTraits = new RegExp('^[^a-z0-9]*' + nonTraits.map(s => `(${s})`).join('|') + '[^a-z0-9]*$', 'i');

module.exports = function(root)
{  
    var name = Object.keys(root).find(key => reTrait.test(key));
  
    if (name)
    {      
        var propval = root[name];
      
        if (Array.isArray(propval))
        {
            return propval.reduce((obj, item) => 
            {
                if (typeof item === 'object' && item !== null)
                {
                    if (Object.hasOwn(item, 'name') && Object.hasOwn(item, 'value'))
                        return { ...obj, [item.name]: item.value };
                    else
                        return { ...obj, ...item };
                }
                
                if (typeof item === 'string')
                    return { ...obj, traits: (obj.traits ? obj.traits + ', ' : '') + item };
                
                return obj;
            }, {});
        }
        
        if (typeof propval === 'object')
            return objectFilter(propval, () => true);
    }
    
    return objectFilter(root, (k, v) => !reNonTraits.test(k.slice(-1)[0]) && typeof v !== 'object');    
}
