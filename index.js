const express = require('express')
const expressLayout = require('express-ejs-layouts') /* Este modulo esta diseñado para trabajar con motores de plantillas y me permite generar vistas dinamicas */
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { connect } = require('mongoose')
const connectDb = require('./server/config/connectDb')
require('dotenv').config()
const mongoStore = require('connect-mongo')

const app = express()

const PORT = process.env.PORT || 3500

connectDb()

app.use(express.urlencoded({ extended: true  }))/* Lee los datos que son enviados a travez de un formulario */
app.use(express.json())

app.use(session({
    secret:'teclado pizza',
    resave: false, 
    saveUninitialized: true, /* Guarda cambios dentro de la seccion */
    store:mongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}))


app.use(express.static('public'))
app.use(expressLayout)
app.set('layout','./layouts/main.ejs')
app.set('view engine', 'ejs')


app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))



app.listen(PORT,()=>{
    console.log("Se conecto el servidor")
})