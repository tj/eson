
var eson = require('../')
  , glob = require('glob')
  , parser = eson();

console.log();
console.log('Before:');
console.log(parser.read('examples/glob.json'));

// in practice you could use a prefix
// like "glob: examples/*.js"

parser.use(function(key, val){
  return glob.sync(val);
});

console.log();
console.log('After:');
console.log(parser.read('examples/glob.json'));
console.log();