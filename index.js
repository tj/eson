
module.exports = process.env.ESON_COV
  ? require('./lib-cov/eson')
  : require('./lib/eson');