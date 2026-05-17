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

exports.getUpdatedData = (data) => {
    const totals = data.reduce(
        (acc, item) => {
            acc.income += item.income || 0;
            acc.expenses += item.expenses || 0;
            acc.savings += item.savings || 0;
            acc.emergencyFund += item.emergencyFund || 0;
            acc.vacation += item.vacation || 0;
            return acc;
        },
        {
            income: 0,
            expenses: 0,
            savings: 0,
            emergencyFund: 0,
            vacation: 0
        }
    )

    return [
        {
            _id: 'Total',
            date: 'Total',
            ...totals
        },
        ...data
    ]
}