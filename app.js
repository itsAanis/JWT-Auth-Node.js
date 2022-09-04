const express = require('express');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const jwt = require('jsonwebtoken')
const app = express()
const {requireAuth} = require('./middleware/authMiddleware')


//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())




// view engine
app.set('view engine', 'ejs')

//database

const dbOptions = {
    useNewUrlparser:true, useUnifiedTopology: true
}
mongoose.connect(process.env.dburi, dbOptions)
.then((result) => app.listen(3300), console.log('connected to db'))
.catch((err) => console.log(err))

//routes
app.get('/',(req,res) => {
    res.render('home')
})
app.get('/welcome',requireAuth, (req,res) => {

})

app.use(authRoutes)




