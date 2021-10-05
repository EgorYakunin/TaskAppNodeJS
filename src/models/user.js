const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(v) {
            if (v.toLowerCase().includes('password')) {
                throw new Error('Password shoundt contain "password" ')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age cant be negative XD')
            }
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this

    // hashing the password
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()    
})

const User = mongoose.model('User', userSchema)

module.exports = User