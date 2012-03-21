
/**
 * Parse strings such as "10 seconds", "5 days",
 * converting them to milliseconds.
 */

module.exports = function(key, val){
  var m = /^(\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)$/.exec(val);
  if (!m) return;
  var n = ~~m[1];
  var type = m[2];
  switch (type) {
    case 'years':
    case 'year':
    case 'y':
      return n * 31557600000;
    case 'days':
    case 'day':
    case 'd':
      return n * 86400000;
    case 'hours':
    case 'hour':
    case 'h':
      return n * 3600000;
    case 'minutes':
    case 'minute':
    case 'm':
      return n * 60000;
    case 'seconds':
    case 'second':
    case 's':
      return n * 1000;
    case 'ms':
      return n;
  }
};