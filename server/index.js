var express = require('express');
var paths = require('../paths');
var { block_status, port } = require('./config');


var app = express();

app.use('/pub', express.static(paths.public));

if (block_status)
{
    var spright = require('sprightly/express');
        
    app.set('views', paths.public);
    app.engine('html', spright({ cache: false }));
    app.get('/*', (req, res) => res.render('block.html', { block_status }));
}
else
{  
    app.use(express.json());
    app.use(require('./config/router'));
}


app.listen(port, () => 
{
    console.log(`ApexView app now listening on port ${port}.`)
});
