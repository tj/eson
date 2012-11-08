
/**
 * Allow environment variables to take precedence over `val`,
 * with optional `prefix`.
 */

module.exports = function(prefix){
  prefix = prefix || '';
  if (prefix && /[^_]$/.test(prefix)) prefix += '_';
  return function(key, val){
    var name = prefix + key.toUpperCase().split(' ').join('_');
    return process.env[name] || val;
  }
};