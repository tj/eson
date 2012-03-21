
/**
 * Include another JSON file,
 * for example "include: config/permissions.json".
 */

module.exports = function(key, val, parser){
  var m = /^include: *(.+)$/.exec(val);
  if (!m) return;
  return parser.read(m[1]);
}
