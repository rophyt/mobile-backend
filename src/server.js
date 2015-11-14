var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(port) {
    var app = express();
    var messageCreated = false;

    app.use(bodyParser.text({
        type: 'application/json'
    }));

    app.post('/messages', function (req, res) {
        var reqBody = JSON.parse(req.body);

        var hasRequiredFields = reqBody.message !== undefined;
        if(!hasRequiredFields) {
            res.status(400).send({ error: true });
            return;
        }

        messageCreated = true;
        var body = {
            message: reqBody.message
        };
        res.status(201).send(body);
    });

    app.get('/messages', function(req, res) {
        var body = {
            messages: []
        }

        if(messageCreated) {
            body.messages.push('message');
        }

        res.status(200).send(body);
    });

    return new Promise(function(resolve, reject) {
        var server = app.listen(port, function() {
            resolve(server);
        });
    });
};
