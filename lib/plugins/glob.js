
/**
 * Perform a glob, for example "glob: routes/*.js".
 */

module.exports = function(key, val){
  var m = /^glob +(.+)$/.exec(val);
  if (!m) return;
  return require('glob').sync(m[1]);
}
  