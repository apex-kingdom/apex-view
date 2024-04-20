var dc = require('deep-copy');
var op = require('object-path');


/**
    Constructs a pipeline function for batching request data.
    
    @param { string } spec
      Request configuration object.
    @return { function }
      Pipeline function.
*/
module.exports = function({ batch = 0, defarg })
{
    /**
        Manages batching of request based on default argument.
    */
    return (args, operation) =>
    {
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
