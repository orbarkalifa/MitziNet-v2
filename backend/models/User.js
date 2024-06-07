const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    }
}, { collection: 'mitzinet_Or_Daniel' });

const User = mongoose.model('User', userSchema);

module.exports = User;
