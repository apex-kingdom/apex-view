
var reIpfs = /^(ipfs:(\/)+)+(ipfs\/)?/;
var reProto = /^(https?)|(ipfs)|(data):/i;
/**
    Resolve a proper image url or data string from a token image attribute.
    
    @param { string } data
      Raw token image data.
    @param { string } type
      Mime type for image data (if available).
    @return { string }
      The proper image url.
*/
module.exports = function(data, type)
{
    // concatenate if image data is an array
    var image = [].concat(data).join('');
    
    if (image)
    {
        // limit image regex test to imitial characters to remove false positives
        if (reProto.test(image.slice(0, 10)))
        {          
              // allow for IPFS image content
              if (reIpfs.test(image)) 
                  image = image.replace(reIpfs, 'https://ipfs.io/ipfs/');            
        }
        else // assume data url
        {
            if (!type)
            {
                // TODO: Need some real image detection here
                var type = 'image/png';
            }
            
            image = `data:${type};base64,${image}`;
        }
    }
    
    return image;
}
