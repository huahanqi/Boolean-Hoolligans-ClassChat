const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    message: String,
    date: Date,
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'group'},
});

const message = mongoose.model('message', messageSchema, 'messages');

module.exports = message;
