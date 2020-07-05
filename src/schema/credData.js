const mongoose = require('mongoose');

const signupDataSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: Number
    }
});

module.exports = mongoose.model('signupData', signupDataSchema)