var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../models/user');

var schema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

schema.post('remove', message => {
    User.findById(message.user, (err, user) => {

        if (err) {
            console.log(err);
            return;
        }

        // user.message.pull(message._id);
        // user.save();

    });
});

module.exports = mongoose.model('Message', schema);