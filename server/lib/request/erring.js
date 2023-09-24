
/**
    Request error handling and retry.

    @param { string } spec
      Request configuration object.
*/
module.exports = function({ name, retries = 0 })
{
    return (args, operation) =>
    {
        var count = retries;
      
        var execute = () => operation(args).catch(error => 
        {
            log(error);
          
            var { code, response: { status = 0, statusText } = {} } = error;
            var canRetry = false;
            
            if (count > 0)
            {
                count--;
                
                if (status === 429)
                    canRetry = true;

                if (code === 'ECONNRESET' || code === 'ETIMEDOUT')
                    canRetry = true;
            }
          
            if (canRetry)
            {
                console.info('apex: retrying', name, 'request');
                return execute();
            }
            
            throw error;
        })
        
        return execute();
    }
}


function log(error)
{
    var { code, response: { status = 0, statusText } = {} } = error;
    
    var err = msg => console.error('apex-error:', msg, { status, code, statusText });
  
    if (status >= 500) 
        err('api server issue');
    else if (status === 429) 
        err('too many requests');
    else if (status >= 400) 
        err('request cannot be fulfilled');        
    else if (code === 'ECONNRESET' || code === 'ETIMEDOUT') 
        err('api server connection reset or timeout');    
    else
        err('an error occurred');
}
