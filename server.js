/**
 * Module dependencies.
 */
require.paths.unshift(__dirname + '/deps');
require('node-weibo').start_gtap(80, __dirname);
