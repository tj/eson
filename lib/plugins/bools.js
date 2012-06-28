
/**
 * Convert "yes", "no", "enabled", "disabled" to booleans.
 */

module.exports = function(key, val){
  switch (val) {
    case 'yes':
    case 'enabled':
      return true;
    case 'no':
    case 'disabled':
      return false;
    default:
      return val;
  }
};