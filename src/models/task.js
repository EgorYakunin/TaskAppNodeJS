const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = Task