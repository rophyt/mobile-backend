var messageServer = require('./src/server');

console.log('hello world');
messageServer(8080)
    .then(function(server) {
        console.log('Message server listening at %s:%s', server.address().address, server.address().port);
    });
