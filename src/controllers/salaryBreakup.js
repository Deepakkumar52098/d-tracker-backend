const salaryBreakupUtils = require('../utils/salaryBreakupUtils')
const SalaryBreakup = require('../models/salaryBreakup')

exports.addDetails = (req, res, next) => {
    const { income, date } = req.body
    // const formattedDate = new Date(date).toLocaleString('en-US', {
    //         month: 'short',
    //         year: 'numeric'
    //     })
    const { emergencyFund, savings, expenses, vacation } = salaryBreakupUtils.getSalaryBreakupDetails(income)
    const inputDate = new Date(date)

    const startDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        1
    )

    const endDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth() + 1,
        1
    )

    SalaryBreakup.findOne({
        date: {
            $gte: startDate,
            $lt: endDate
        }
    })
        .then(result => {
            if (result) {
                const error = new Error('Income detail exists. Please try updating it.')
                error.statusCode = 400
                throw error
            }
            const salaryBreakupDetails = new SalaryBreakup({
                date,
                income,
                emergencyFund,
                savings,
                expenses,
                vacation
            })
            return salaryBreakupDetails.save()
        })
        .then(breakupDetails => {
            // if(!breakupDetails){
            //     return
            // }
            res.status(201).json({ breakupDetails, message: 'Income details added successfully' })
        })
        .catch(err => {
            res.status(err.statusCode || 500).json({ message: err.message })
        })
}

exports.getDetails = (req, res, next) => {
    // const year = req.params.year
    const year = Number(req.params.year)
    SalaryBreakup.find({
        date: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1)
        }
    })
        .then(data => {
            const updatedData = salaryBreakupUtils.getUpdatedData(data)
            res.status(200).json({ breakupDetails: updatedData, message: 'All salary details fetched successfully' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

exports.deleteDetails = (req, res, next) => {
    const id = req.params.id
    SalaryBreakup.findByIdAndDelete(id)
        .then(data => {
            if (data) {
                return data
            }
            throw new Error('Item not found')
        })
        .then(result => {
            res.status(200).json({ data: result, message: 'Income details deleted successfully' })
        })
        .catch(err => {
            res.status(500).json({ message: err })
        })
}
