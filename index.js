const express = require('express')
const routes = require('./back-end/routes')
//const bodyParse = require('body-parser')
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('', routes)
app.set('view engine', 'ejs')

app.listen(process.env.NODE_PORT,() => {
    console.log(`Servidor online: http://${process.env.MYSQL_HOST}:${process.env.NODE_PORT}`)
})