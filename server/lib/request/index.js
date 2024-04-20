var apis = require('./apis');
var pipes = require('./pipes');


var object = {};
var idFn = x => x

Object.keys(apis).forEach(name => 
{
    var { argue, batch, error, page, polate, rotate, send, throttle } = pipes(name);
    
    var main = [ send, polate, throttle, rotate, page, error, batch, argue ];
    var params = [ polate, argue ];

    var reducer = (func, oper) => args => oper(args, func)

    object[name] = main.reduce(reducer, idFn);
    object[name].params = params.reduce(reducer, idFn);
});

module.exports = object;
