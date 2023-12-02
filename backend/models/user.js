const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    admin: Boolean
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 8);
});

module.exports = mongoose.model('user', UserSchema);
