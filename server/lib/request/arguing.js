var dc = require('deep-copy');
var op = require('object-path');


/**
    Applies declarative configuration parameters.

    @param { string } spec
      Request configuration object.
*/
module.exports = function({ batch = 0, defarg, vars })
{
    return (args, operation) =>
    {
        if (typeof args !== 'object' || Array.isArray(args)) 
            args = (obj => (op.set(obj, defarg, args), obj))({});
        // merga with spec variables
        args = { ...vars, ...args };
        
        var main = op.get(args, defarg);
        if (batch && Array.isArray(main))
        {
            var promises = [];
            var count = Math.ceil(main.length / batch);
            
            while (promises.length < count)
            {
                var len = promises.length;
                var list = main.slice(len * batch, (len + 1) * batch);
                // deep copy arguments object to set list
                var params = (obj => (op.set(obj, defarg, list), obj))(dc(args));
                
                promises.push(operation(params));
            }
            
            return Promise.all(promises).then(array => array.reduce((a, e) => ([ ...a, ...e ]), []));
        }
        
        return operation(args);
    }
}
