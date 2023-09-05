var e = require('./entities');


module.exports = async function(input)
{
    var stage1 = Promise.all(
    [ 
        e.stake(input) 
    ])
  
    var stage2 = ([ stake ]) => Promise.all(
    [
        e.account(stake.stakeKey).then(account => ({ ...account, input: stake.input })),
        e.assets(stake.stakeKey),
        e.chain()        
    ])
    
    var stage3 = ([ account, assets, chain ]) => Promise.all(
    [
          e.pool(account.poolId).then(pool => ({ ...account, pool })),
          Promise.all(assets.map(data => 
          {
              var assetId = data.policy_id + data.asset_name;
              var mintTx = hash => e.tx(hash, chain)
              
              return e.token(assetId, mintTx).then(token => e.asset(data, token));
          }))
    ])
    
    var stage4 = ([ account, assets ]) =>
    {
        return { ...account, nfts: assets.filter(i => i.isNFT), tokens: assets.filter(i => !i.isNFT) }
    }
    
    var stage5 = account =>
    {
        var c = e.accountCollections(e.collection);        
        return Promise.all(account.nfts.map(c.add)).then(() => ({ ...account, collections: c.get() }));
    }
    
    return stage1.then(stage2).then(stage3).then(stage4).then(stage5);
}
