var { decode } = require('hex-encode-decode');


/**
    Parse a CIP68 metadata object for token traits.
    
    The `mapdata` is located at:
      metadata > [assetClass] > fields > [0] > map
*/
module.exports = function(mapdata)
{
    var reducer = (object, { k, v }) =>
    {
        object[decode(k.bytes)] = (v.list || [ v ]).map(i => decode(i.bytes)).join(', ');      
        
        return object;
    }
    
    return mapdata.reduce(reducer, {});
}
