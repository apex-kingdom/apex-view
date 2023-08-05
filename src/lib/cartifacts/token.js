import numeral from 'numeral'
import { decode } from 'hex-encode-decode'
import objectFilter from '../object-filter'


let reBaseName = /^(.+)\s*#.*$/;
let nonTraits = 
[   
    'description', 
    'files', 
    'image', 
    'media', 
    'mediaType', 
    'name', 
    'project', 
    'projectName',
    'website'
];
let reNonTraits = new RegExp('^[^a-z0-9]*' + nonTraits.map(s => `(${s})`).join('|') + '[^a-z0-9]*$', 'i');
/**
    Adapts requested Cardano native token data for display and use in the UI.
    
    Ref: https://cips.cardano.org/cips/cip25
    
    The token data object returned will include:
      - `isNFT` (boolean) - Is token an NFT?
      - `decimals` (number) - number of significant digits after decimal point
      - `quantity` (number) - total existing quantity for this token
    
    @return { object }
      Formatted token data.
*/
export default function(init, data)
{
    let token = { __raw: data, __token: true };
    let meta = data.metadata || {};
    let ocmd = data.onchain_metadata || {};
    let ocmdExists = !!data.onchain_metadata
    
    token.policyId = data.policy_id;
    token.fingerprint = data.fingerprint;
    // for now we will assume token is an NFT when 
    // `quantity` is 1. (other checks may be needed)
    token.isNFT = data.quantity == 1;
    
    token.ticker = meta.ticker || ocmd.ticker;
    token.assetName = data.asset_name;
    token.assetNameDec = decode(token.assetName);
    token.name = (!token.isNFT && token.ticker) || ocmd.name || token.assetNameDec;

    token.description = ocmd.description;
    token.files = ocmd.files || [];
    
    token.image = ocmd.image || meta.logo;
    token.imageType = ocmd.mediaType || 'image/png';
        
    // for collection use
    token.project = ocmd.project;
    if (reBaseName.test(token.name)) token.assetBaseName = token.name.replace(reBaseName, '$1');    
    
    token.decimals = meta.decimals || 0;    
    token.quantity = numeral(data.quantity).value();
    // token.quantityFormatted = numeral(token.quantity).format(format(token.quantity));

    token.userQuantity = numeral(init.quantity).value();
    token.userQuantityAdjusted = times(token.decimals).reduce(v => v * .1, token.userQuantity);
    token.userQuantityFormat = token.userQuantityAdjusted > 10 ? '0,0' : `0,0.[${'0'.repeat(token.decimals)}]`;
    token.userQuantityFormatted = numeral(token.userQuantityAdjusted).format(token.userQuantityFormat);
    
    token.onchainMetadataStandard = data.onchain_metadata_standard;
        
    if (typeof ocmd.attributes === 'object')
        token.traits = objectFilter(ocmd.attributes, ()  => true);
    else if (typeof ocmd.traits === 'object')
        token.traits = objectFilter(ocmd.traits, ()  => true);
    else
        token.traits = objectFilter(ocmd, k => !reNonTraits.test(k));

    return token;
}

let times = num => Array.apply(null, Array(num))
