
module.exports = process.env.EJSON_COV
  ? require('./lib-cov/ejson')
  : require('./lib/ejson');