var pull = require('../request');


/**
    Gets transaction data for the given hash id.
    
    @param { string } hash
      ID for the transaction to be retrieved.
    @return { promise }
      Resolves to a "transaction" object.
*/
module.exports = async function(hash, chain)
{
    return pull.transaction(hash).then(data => 
    {
        let tx = { __entity: 'transaction' };
        
        tx.hash = data.hash;
        
        let { slot } = data;
        let seconds = chain.systemStart;
                    
        for (let era of chain.eras)
        {
            seconds += Math.min(era.endSlot, slot) * era.slotLen;
            slot = slot - era.endSlot;
            if (slot <= 0) break;
        }        
        // if the era of the tx not yet archived set to `null` for now
        tx.time = (slot > 0) ? null : seconds * 1000;
        
        return tx;                  
    });  
}
