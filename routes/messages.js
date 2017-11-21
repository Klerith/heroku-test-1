var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

var User = require('../models/user');

var Message = require('../models/message');

router.get('/', function(req, res, next) {

    Message.find()
        .populate('user', 'firstName')
        .exec((err, messages) => {
            if (err) {
                return res.status(500).send({
                    title: 'An error ocurred',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: messages
            })

        });

});


router.use('/', (req, res, next) => {

    jwt.verify(req.query.token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: err
            });
        };

        next();
    });

});

router.post('/', function(req, res, next) {

    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, (err, user) => {
        if (err) {
            return res.status(500).send({
                title: 'An error ocurred',
                error: err
            });
        }

        var message = new Message({
            content: req.body.content,
            user: user._id
        });


        message.save((err, result) => {

            if (err) {
                return res.status(500).send({
                    title: 'An error ocurred',
                    error: err
                });
            }

            user.messages.push(result);
            user.save();

            return res.status(201).send({
                title: 'Saved Message',
                obj: result
            });

        })



    })



});

router.patch('/:id', function(req, res) {

    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id, (err, message) => {

        if (err) {
            return res.status(500).send({
                title: 'An error ocurred',
                error: err
            });
        }

        if (!message) {
            return res.status(500).send({
                title: 'No message found!',
                error: {
                    message: message
                }
            });
        }

        if (message.user != decoded.user._id) {
            return res.status(401).send({
                title: 'Not authorized',
                error: {
                    message: 'User do not match'
                }
            });
        }

        message.content = req.body.content;

        message.save((err, result) => {

            if (!message) {
                return res.status(500).send({
                    title: 'An error ocurred',
                    error: err
                });
            }

            res.status(200).send({
                message: 'Updated message',
                obj: result
            })
        });

    })

});

router.delete('/:id', function(req, res) {

    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id, (err, message) => {

        if (err) {
            return res.status(500).send({
                title: 'An error ocurred',
                error: err
            });
        }

        if (!message) {
            return res.status(500).send({
                title: 'No message found!',
                error: {
                    message: message
                }
            });
        }

        if (message.user != decoded.user._id) {
            return res.status(401).send({
                title: 'Not authorized',
                error: {
                    message: message
                }
            });
        }


        message.remove((err, result) => {

            if (!message) {
                return res.status(500).send({
                    title: 'An error ocurred',
                    error: err
                });
            }

            res.status(200).send({
                message: 'Updated message',
                obj: result
            })
        });

    })

});



module.exports = router;