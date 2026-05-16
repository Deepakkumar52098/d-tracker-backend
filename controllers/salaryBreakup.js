const salaryBreakupUtils = require('../utils/salaryBreakupUtils')
const SalaryBreakup = require('../models/salaryBreakup')
exports.addDetails = (req, res, next) => {
    const { income } = req.body
    const { emergencyFund, savings, expenses, vacation } = salaryBreakupUtils.getSalaryBreakupDetails(income)
    const salaryBreakupDetails = new SalaryBreakup({
        income,
        emergencyFund,
        savings,
        expenses,
        vacation
    })
    salaryBreakupDetails.save()
        .then(breakupDetails => {
            res.status(201).json({ breakupDetails, message: 'Salary details got added successfully' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}