
/**
 * Module dependencies.
 */

var Parser = require('./Parser');

/**
 * Expose `Parser`.
 */

exports = module.exports = Parser;

/**
 * Expose plugins.
 */

exports.ms = require('./plugins/ms');
exports.env = require('./plugins/env');
exports.args = require('./plugins/args');
exports.glob = require('./plugins/glob');
exports.bools = require('./plugins/bools');
exports.replace = require('./plugins/replace');
exports.include = require('./plugins/include');
exports.dimensions = require('./plugins/dimensions');