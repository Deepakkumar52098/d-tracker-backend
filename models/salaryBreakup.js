const mongoose = require('mongoose')

const Schema = mongoose.Schema

const salaryBreakupSchema = new Schema({
    income: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    savings: {
        type: Number,
        required: true
    },
    emergencyFund: {
        type: Number,
        required: true
    },
    vacation: {
        type: Number,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model('SalaryBreakup', salaryBreakupSchema)