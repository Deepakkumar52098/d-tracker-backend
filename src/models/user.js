const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salaryDetails: {
        type: Schema.Types.ObjectId,
        ref: 'SalaryBreakup'
    }
})

module.exports = mongoose.model('User', userSchema)