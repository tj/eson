
/**
 * Allow ARGV to take precedence over `val`, supports:
 * 
 *   --NAME
 *   --NAME value
 *   --no-NAME
 * 
 */

module.exports = function(args){
  args = args || process.argv.slice(1);
  return function(key, val){
    var name = key.split(' ').join('-');

    for (var i = 0, len = args.length; i < len; ++i) {
      // --NAME
      if (args[i] == '--' + name) {
        // --NAME val
        if (args[i + 1] && '-' != args[i + 1]) return args[++i];
        return true;
      }

      // --no-NAME
      if (args[i] == '--no-' + name) return false;
    }

    return val;
  };
};
