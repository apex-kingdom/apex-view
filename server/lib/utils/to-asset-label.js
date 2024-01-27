var { crc8 } = require('easy-crc');


/**
    Converts an asset class to an encoded asset label (as per CIP-0067).
    
    If `assetClass` is not a 2-byte number then `null` is returned.

    @param { number } assetClass
      A number representing the asset class to be encoded.
    @return { string }
      An asset label or `null` if `assetClass` is invalid.
*/
module.exports = function(assetClass)
{
    // must be a number
    if (typeof assetClass !== 'number') return null;
    // 1. convert to hex
    var label = assetClass.toString(16);
    // must be no larger than 2-bytes
    if (label.length > 4) return null;
    // 2. zero-pad (to 2 bytes)
    label = '0'.repeat(4 - label.length) + label;    
    // 3. calculate CRC-8 checksum
    var [ b1, b2 ] = (label.match(/.{2}/g) || []).map(byte => '0x' + byte);
    label += crc8('CRC-8', [ b1, b2 ]).toString(16);    
    // 4. add brackets
    label = '0' + label + '0';
    
    return label;
}
