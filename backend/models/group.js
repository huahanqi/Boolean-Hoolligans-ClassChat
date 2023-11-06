const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
});

const group = mongoose.model('group', groupSchema, 'groups');

module.exports = group;
