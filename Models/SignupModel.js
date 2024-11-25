const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const signupSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

signupSchema.methods.generatToken = async function () {
    try {
        return jwt.sign({
            userid: this._id.toString(),
            email: this.email,
        },
            "Deeneco", {
            expiresIn: "1d",
        })
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
}

const User = mongoose.model('User', signupSchema)
module.exports = User