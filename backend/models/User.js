/* Or Bar Califa 318279429
Daniel Tselon Fradkin 316410885 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
}, { collection: 'mitzinet_Or_Daniel' });
const User = mongoose.model('User', userSchema);

module.exports = User;
