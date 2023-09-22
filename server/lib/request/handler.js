var arguing = require('./arguing');
var configure = require('./configure');
var erring = require('./erring');
var rotating = require('./rotating');
var paging = require('./paging');
var sending = require('./sending');
var throttling = require('./throttling');


module.exports = function(name)
{
    var spec = configure(name);
  
    var pipeline = 
    [ 
        sending(spec),
        throttling(spec),
        rotating(spec),
        paging(spec),
        erring(spec),
        arguing(spec)
    ];
    // return pipelined request function
    return pipeline.reduce((func, oper) => args => oper(args, func), null);
}
