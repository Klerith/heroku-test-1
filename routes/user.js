var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function(req, res, next) {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    user.save((err, result) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occour',
                error: err
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result
        });
    })

});

router.post('/signin', function(req, res, next) {

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            return res.status(500).json({
                title: 'An error occour',
                error: err
            });
        };

        if (!user) {
            return res.status(401).json({
                title: 'No hay usuario',
                error: { message: 'Invalid login credentials' }
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            // invalid
            return res.status(401).json({
                title: 'No hace match el password',
                error: { message: 'Invalid login credentials' }
            });
        }


        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 }); //2 hours

        res.status(200).json({
            message: 'Successfully log in',
            token: token,
            userId: user._id
        });

    });







});

module.exports = router;