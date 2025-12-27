const mongoose  = require('mongoose');


const todoSchema = mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        require: true
    }
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo