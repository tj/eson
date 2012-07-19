
/**
 * Convert "yes", "no", "on", "off", "enabled", "disabled" to booleans.
 */

module.exports = function(key, val){
  switch (val) {
    case 'on':
    case 'yes':
    case 'enable':
    case 'enabled':
      return true;
    case 'no':
    case 'off':
    case 'disable':
    case 'disabled':
      return false;
    default:
      return val;
  }
};