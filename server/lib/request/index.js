var apis = require('./apis');
var handler = require('./handler');


var object = {};

Object.keys(apis).forEach(name => object[name] = handler(name))

module.exports = object;
