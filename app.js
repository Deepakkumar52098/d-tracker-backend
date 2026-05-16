const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const salaryBreakup = require('./routes/salaryBreakup')

const app = express()


app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/salaryBreakup', salaryBreakup)

mongoose.connect('mongodb+srv://Deepakkumar52098:Deepakkumar%402016@cluster0.yxkfr9z.mongodb.net/d-Tracker?appName=Cluster0')
    .then(result => {
        console.log("Initialized mongoDB")
        app.listen(8080)
    })
    .catch(err => {
        console.log(err)
    })
