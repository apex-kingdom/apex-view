var dc = require('deep-copy');
var op = require('object-path');


/**
    Constructs a pipeline function for ensure pipeline arguments are in object 
    form and merge them with spec variables.
    
    @param { string } spec
      Request configuration object.
    @return { function }
      Pipeline function.
*/
module.exports = function({ defarg, vars })
{
    return (args, operation) =>
    {
        if (typeof args !== 'object' || Array.isArray(args)) 
            args = (obj => (op.set(obj, defarg, args), obj))({});
        // merga with spec variables
        args = { ...vars, ...args };
        
        return operation(args);
    }
}
