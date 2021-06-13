const express = require('express')
const routes = require('./back-end/routes')
const {Comments} = require('./back-end/models')
const app = express()

require('dotenv').config()
app.use(express.json())
app.use(express.static('./front-end/public'))
app.use('', routes)
app.set('view engine', 'ejs')

Comments.sync()
app.get('/',function(req, res, next){
    res.render('./front-end/views/pages/index')
})
app.listen(process.env.NODE_PORT,() => {
    console.log(`Servidor online: http://${process.env.MYSQL_HOST}:${process.env.NODE_PORT}`)
})