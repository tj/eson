
/**
 * Module dependencies.
 */

var path = require('path')
  , dirname = path.dirname
  , join = path.join;

/**
 * Include another JSON file,
 * for example "include: config/permissions.json".
 */

module.exports = function(key, val, parser){
  var m = /^include: *(.+)$/.exec(val);
  if (!m) return;
  var path = join(dirname(parser.path), m[1] + '.json');
  return parser.clone().read(path);
}
