
/**
 * Module dependencies.
 */

var Parser = require('./Parser');

/**
 * Expose `Parser`.
 */

exports = module.exports = Parser;

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Expose plugins.
 */

exports.ms = require('./plugins/ms');
exports.env = require('./plugins/env');
exports.glob = require('./plugins/glob');
exports.bools = require('./plugins/bools');
exports.replace = require('./plugins/replace');
exports.include = require('./plugins/include');
exports.dimensions = require('./plugins/dimensions');