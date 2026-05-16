const express = require('express')

const app = express()

app.use('/', (req, res, next)=>{
    res.json('Initial setup')
})

app.listen(8080)