var { crc8 } = require('easy-crc');


/**
    Converts an asset name or asset label to an asset class (as per CIP-0067).
    
    If `assetName` does not contain a valid asset class, `null` is returned.
    
    @param { string } assetName
      Hex string representing an asset name or label.
    @return { number }
      An asset class number or `null` if no conversion possible.
*/
module.exports = function(assetName)
{
    // must be a string
    if (typeof assetName !== 'string') return null;
    // 1. get first 4 bytes (8 chars) of asset name
    var chars = assetName.slice(0, 8), len = chars.length;
    // must have at least 8 chars
    if (len !== 8) return null;
    // must have 'brackets'
    if (chars[0] !== '0' || chars[len - 1] !== '0') return null;
    // 2. remove 'brackets' and convert to bytes
    chars = chars.slice(1, -1);
    // 3. convert chars to bytes
    var [ b1, b2, chk ] = chars.match(/.{2}/g);
    // 4. generate checksum from 2-byte name
    var crc = crc8('CRC-8', [ b1, b2 ].map(b => '0x' + b)).toString(16);
    // checksum must match
    if (crc !== chk) return null;
    
    return parseInt(b1 + b2, 16);
}
