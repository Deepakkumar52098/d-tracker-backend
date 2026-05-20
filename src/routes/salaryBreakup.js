const express = require('express')
const { getDetails, editDetails, addDetails, deleteDetails } = require('../controllers/salaryBreakup')

const router = express.Router()

router.post('/addDetails', addDetails)

router.post('/editDetails', editDetails)

router.get('/getDetails/:year', getDetails)

router.delete('/deleteDetail', deleteDetails)

module.exports = router