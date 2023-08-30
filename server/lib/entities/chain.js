var pull = require('../request');


/**
    Gets blockchain details.
    
    @return { promise }
      Resolves to a "chain" object.
*/
module.exports = async function()
{
    var chain = { __entity: 'chain' };
    
    return Promise.all(
    [
        pull.genesis(),
        
        pull.eras().then(array.map(({ start, end, parameters }) => 
        {
            let era = {};
            
            era.startEpoch = start.epoch;
            era.startSlot = start.slot;
            era.startTime = start.time;

            era.endEpoch = end.epoch;
            era.endSlot = end.slot;
            era.endTime = end.time;
            
            era.epochLen = parameters.epoch_length;
            era.slotLen = parameters.slot_length;
            
            return era;
        }))
    ])
    .then(([ genesis, eras ]) => 
    {        
        chain.systemStart = genesis.system.start;
        chain.epochLen = genesis.epoch_length;
        chain.eras = eras;
        
        return chain;
    });    
}
