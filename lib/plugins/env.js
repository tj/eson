
/**
 * Allow environment variables to take precedence over `val`.
 */

module.exports = function(key, val){
  var name = key.toUpperCase().split(' ').join('_');
  return process.env[name] || val;
};