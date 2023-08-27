var pull = require('../request');


/**
    Gets transaction data for the given hash id.
    
    @param { string } hash
      ID for the transaction to be retrieved.
    @return { promise }
      Resolves to a "transaction" object.
*/
module.exports = async function(hash)
{
    return pull.transaction(hash).then(data => 
    {
        let tx = { __entity: 'transaction' };
        
        tx.blockHeight = data.block_height;
        
        return tx;        
    });  
}
