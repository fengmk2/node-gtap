var port = process.env.PORT || 8080;
require('weibo').start_gtap(port, process.env.HOME);
console.log('listen on ' + port);

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});
