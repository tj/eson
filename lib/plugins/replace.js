
/**
 * Perform a replacement of `str` with `sub`.
 */

module.exports = function(str, sub){
  return function(key, val){
    return 'string' == typeof val
      ? val.replace(str, sub)
      : val;
  }
}
