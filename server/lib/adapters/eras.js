var at = require('../seconds');


/**
    Transforms raw api data into ApexView entity data.
    
    Era entity data fields:
    
    @param { object } data
      Raw api data.
    @return { array }
      List of entities.
*/
exports.entity = function(data)
{
    return data.map(({ start, end, parameters }) => 
    {
        var era = { __entity: 'era' };
        
        era.startEpoch = start.epoch;
        era.startSlot = start.slot;
        era.startTime = start.time;

        era.endEpoch = end.epoch;
        era.endSlot = end.slot;
        era.endTime = end.time;
        
        era.epochLen = parameters.epoch_length;
        era.slotLen = parameters.slot_length;
        
        return era;    
    });
}

exports.apiName = 'eras';
exports.cacheExp = at(1).months;
