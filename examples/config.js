
var eson = require('../')
  , parser = eson();

console.log();
console.log('Before:');
console.log(parser.read('examples/config.json'));

parser.use(eson.ms);
parser.use(eson.dimensions);
parser.use(eson.replace('{root}', '/www/myapp.com'));

console.log();
console.log('After:');
console.log(parser.read('examples/config.json'));
console.log();