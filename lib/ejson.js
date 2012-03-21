
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
exports.glob = require('./plugins/glob');
exports.dimensions = require('./plugins/dimensions');