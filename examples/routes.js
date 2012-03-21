
var Parser = require('../')
  , parser = new Parser;

console.log();
console.log('Before:');
console.log(parser.read('examples/routes.json'));

parser.use(function(key, val){
  val = val.split(' ');
  var path = val.shift();
  var method = val.shift();
  return require('./routes/' + path)[method];
});

console.log();
console.log('After:');
console.log(parser.read('examples/routes.json'));
console.log();