const express = require('express')
const salaryBreakup = require('../controllers/salaryBreakup')

const router = express.Router()

router.post('/addDetails', salaryBreakup.addDetails)

module.exports = router