/**
 * Module dependencies.
 */

require.paths.unshift(__dirname + '/support');
require('../node-weibo').start_gtap(8080, __dirname);