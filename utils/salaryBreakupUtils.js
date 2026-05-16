const breakupPrecentage = Object.freeze({
    emergencyFund: 35,
    savings: 20,
    expenses: 40,
    vacation: 10,

})

const getCalculatedAmount = (amount, percentage) => {
    return amount * (percentage / 100)
}

exports.getSalaryBreakupDetails = (income) => {
    const emergencyFund = getCalculatedAmount(income, breakupPrecentage.emergencyFund)
    const savings = getCalculatedAmount(income, breakupPrecentage.savings)
    const expenses = getCalculatedAmount(income, breakupPrecentage.expenses)
    const vacation = getCalculatedAmount(income, breakupPrecentage.vacation)
    return {
        emergencyFund,
        savings,
        expenses,
        vacation
    }
}