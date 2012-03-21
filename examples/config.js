
var Parser = require('../')
  , parser = new Parser;

console.log();
console.log('Before:');
console.log(parser.read('examples/config.json'));

parser.use(Parser.ms);
parser.use(Parser.dimensions);
parser.use(Parser.replace('{root}', '/www/myapp.com'));

console.log();
console.log('After:');
console.log(parser.read('examples/config.json'));
console.log();