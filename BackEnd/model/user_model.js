const mongoose = require('mongoose');

const singupSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    password: {
        type: String,
        require: true,
        select: false
    }
})
const modelSignup = mongoose.model('Users', singupSchema)
module.exports = modelSignup