/**
 * Module dependencies.
 */

var path = require('path')
  , dirname = path.dirname
  , join = path.join
  , glob = require('glob')

/**
 * Include another JSON file,
 * for example "include config/permissions".
 */

module.exports = function(key, val, parser){
  // match globbing [] {} syntax or just single file
  var single = /^include +([^{\[].*)$/.exec(val)
  var globbing = /^include +([\{\[]?) *(.*?) *([\}\]]?)$/.exec(val);
  // need to match against single first
  var m = single ? single : globbing
  if (!m) return;

  var brace = "";
  var relativePath = m[1];

  if (!single) {
    // try to match braces
    if ((m[1] == "" && m[3] != "") ||
        (m[1] != "" && m[1].charCodeAt(0) + 2 !== m[3].charCodeAt(0))) {
      return; // braces don't match
    }
    brace = m[1];
    relativePath = m[2];
  }

  relativePath += '.json';
  var filePaths = glob.sync(join(dirname(parser.path), relativePath));
  if (brace === "") return mergeFiles(parser, filePaths);
  if (brace === "{") return filesAsMap(parser, filePaths);
  if (brace === "[") return filesAsArray(parser, filePaths);
  // shouldn't get here
  throw new Error('Error: ' + brace);
}

// Break files into rows of key/value pairs where key is the filename
// minus extension & value is file content
function filesAsMap(parser, paths) {
  var map = {};
  paths.forEach(function(filePath) {
    var key = path.basename(filePath, path.extname(filePath));
    map[key] = parser.clone().read(filePath);
  })
  return map;
}

// Contents of each file become values in array
function filesAsArray(parser, paths) {
  return paths.map(function(filePath) {
    return parser.clone().read(filePath);
  })
}

// Merges each file's keys together as single result
function mergeFiles(parser, paths) {
  return paths.map(function(filePath) {
    return parser.clone().read(filePath);
  }).reduce(function(previous, data) {
    for (var key in data) {
      previous[key] = data[key];
    }
    return previous;
  })
}
