
/**
 * Parse dimensions, for example "800x600",
 * producing the object `{ width: 800, height: 600 }`.
 */

module.exports = function(key, val){
  var m = /^(\d+)x(\d+)$/.exec(val);
  return m
    ? { width: ~~m[1], height: ~~m[2] }
    : undefined;
};