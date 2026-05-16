const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use('/', (req, res, next) => {
    res.json('Initial setup')
})

mongoose.connect('mongodb+srv://Deepakkumar52098:Deepakkumar%402016@cluster0.yxkfr9z.mongodb.net/d-Tracker?appName=Cluster0')
    .then(result => {
        console.log("Initialized mongoDB")
        app.listen(8080)
    })
    .catch(err => {
        console.log(err)
    })
