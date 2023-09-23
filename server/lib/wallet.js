var e = require('./adapters');
var nf = require('./num-format');
var accountCollections = require('./account-collections')


module.exports = async function(input)
{
    var stage1 = Promise.all(
    [ 
        e.stake(input) 
    ])
  
    var stage2 = ([ stake ]) => Promise.all(
    [
        e.account(stake.stakeKey).then(account => ({ ...account, input: stake.input })),
        e.assets(stake.stakeKey)
    ])
    
    var stage3 = ([ account, { ids, map } ]) => Promise.all(
    [
          e.pool(account.poolId).then(pool => ({ ...account, pool })),
          e.token(ids, true).then(tokens => tokens.map(tok => 
          {
              var asset = { __entity: 'asset' };
              
              if (!map[tok.policyId + tok.assetName]) console.log('not found', tok);
              
              asset.userQuantity = map[tok.policyId + tok.assetName].quantity;
              asset.userQuantityFormatted = nf(asset.userQuantity, tok.decimals);
                  
              return { ...tok, ...asset };
          }))
    ])
    
    var stage4 = ([ account, assets ]) =>
    {
        return { ...account, nfts: assets.filter(i => i.isNFT), tokens: assets.filter(i => !i.isNFT) }
    }
    
    var stage5 = account =>
    {
        var c = accountCollections(e.collection);        
        return Promise.all(account.nfts.map(c.add)).then(() => ({ ...account, collections: c.get() }));
    }
    
    return stage1.then(stage2).then(stage3).then(stage4).then(stage5);
}
