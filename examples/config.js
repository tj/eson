
var Parser = require('../')
  , parser = new Parser;

console.log();
console.log('Before:');
console.log(parser.read('examples/config.json'));

parser.use(Parser.ms);
parser.use(Parser.dimensions);
parser.use(root('/www/myapp.com'));

function root(path) {
  return function(key, val){
    if ('string' != typeof val) return;
    return val.replace('{root}', path)
  }
}

console.log();
console.log('After:');
console.log(parser.read('examples/config.json'));
console.log();