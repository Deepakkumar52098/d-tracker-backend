const express = require('express')
const salaryBreakup = require('../controllers/salaryBreakup')

const router = express.Router()

router.post('/addDetails', salaryBreakup.addDetails)

router.get('/getDetails/:year', salaryBreakup.getDetails)

router.delete('/deleteDetail/:id', salaryBreakup.deleteDetails)

module.exports = router