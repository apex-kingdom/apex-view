var axios = require('axios');
var op = require('object-path');
var { prod } = require('../../../config');


/**
    Constructs a pipeline function for sending request data.
    
    @param { string } spec
      Request configuration object.
    @return { function }
      Pipeline function.
*/
module.exports = function({ method, path })
{
    /**
        Sends request for Cardano blockchain data.
        
        @param { any, object } params
          Request parameters
        @return { promise }
          Resolves to the data requested.
    */
    return params =>
    {                    
        if (!prod) console.log('apex:', method.toUpperCase(), params.url);
        
        return axios({ method, ...params }).then(data => op.get(data, path));
    }
}
