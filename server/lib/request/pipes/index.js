var configure = require('../configure');
var arguing = require('./arguing');
var batching = require('./batching');
var erring = require('./erring');
var paging = require('./paging');
var polating = require('./polating');
var rotating = require('./rotating');
var sending = require('./sending');
var throttling = require('./throttling');


module.exports = function(name)
{
    var spec = configure(name);
      
    var segments = 
    { 
        argue: arguing(spec),
        batch: batching(spec),
        error: erring(spec),
        page: paging(spec),
        polate: polating(spec),
        rotate: rotating(spec),
        send: sending(spec),
        throttle: throttling(spec)
    };                
    
    return segments;
}
