import { decode as dec, encode as enc } from 'hex-encode-decode'


/**
    Decode JSON data.
    
    @param { string } string
      The data to be decoded.
*/
export function decode(string)
{
    return JSON.parse(atob(string));
}


/**
    Encode JSON data.
    
    @param { any } json
      The data to be encoded.
*/
export function encode(json)
{
    return btoa(JSON.stringify(json));
}
