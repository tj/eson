
var Parser = require('../')
  , glob = require('glob')
  , parser = new Parser;

console.log();
console.log('Before:');
console.log(parser.read('examples/glob.json'));

parser.use(function(key, val){
  return glob.sync(val);
});

console.log();
console.log('After:');
console.log(parser.read('examples/glob.json'));
console.log();