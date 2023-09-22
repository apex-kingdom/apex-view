var at = require('../seconds');


/**
    Transforms raw api data into ApexView entity data.
    
    Transactio entity data fields:    
    - hash (string)
    - slot
    
    @param { object } data
      Raw api data
    @return { object }
      Entity data.
*/
exports.entity = function(data)
{
    let tx = { __entity: 'transaction' };
    
    tx.hash = data.hash;
    tx.slot = data.slot;

    return tx;
}

exports.apiName = 'transaction';
exports.cacheExp = at(1).weeks;
exports.ancillary = async (transaction, { eras, genesis }) =>
{
    return Promise.all([ genesis(), eras() ]).then(([ genesis, eras ]) =>
    {
        let { slot } = transaction;
        let seconds = genesis.systemStart;
                    
        for (let era of eras)
        {
            seconds += Math.min(era.endSlot, slot) * era.slotLen;
            slot = slot - era.endSlot;
            if (slot <= 0) break;
        }        
        // if the era of the tx not yet archived set to `null` for now
        transaction.time = (slot > 0) ? null : seconds * 1000;
        
        return transaction;    
    })
}
