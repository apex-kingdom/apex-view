var path = require('path');
var packson = require('./package.json');


exports.root = path.join(__dirname);
exports.dist = path.join(exports.root, ...packson.main.split(/\//).slice(0, -1));  
exports.sub = (...base) => (...segs) => path.join(...base, ...segs)

var paths =
{
    build: ['bld'],
    components: ['src', 'components'],
    modules: ['node_modules'],
    public: ['public'],
    server: ['server'],
    source: ['src'],
    test: ['tst']
};

for (name in paths) exports[name] = path.join(exports.root, ...paths[name]);
