require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')



//handle errors
const handleErrors = (err) => {
  //message property comes up on all errors contains what kind of error
  console.log(err.message, err.code)// code prperty doesnt exist on all erros but it does for the inque one.
  let errors = {email: '', password: ''} // what will be sent to user if error
// high order function will be used to handle errors from both routes.
if(err.code === 11000) {
  errors.email = ' that email is already registered'
  return errors
}

//incorrect email
if (err.message === 'incorrect email') {
  errors.email = 'Incorrect email and/or password';
}

// incorrect password
if (err.message === 'incorrect password') {
  errors.password = 'Incorrect email and/or password';
}


// validation errors
if(err.message.includes('user validation failed')) {
Object.values(err.errors).forEach(({properties}) => {
 errors[properties.path] = properties.message  
})
}
  return errors
}
const maxAge = 3 * 24 * 60 * 60 //takes time in seconds , cookies take it in miliseconds.
const createToken = (id) => {
  return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:maxAge })
}    //secret key created with crypto library



module.exports.signup_get = (req, res) => {
    res.render('signup')
}
module.exports.login_get = (req, res) => {
    res.render('login');
  }

module.exports.signup_post = async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body  //destructing object
    console.log(email, password)
    try {
    const user = await User.create({email, password})
    const token = createToken(user._id)
    res.cookie('b21', token, {httpOnly: true, maxAge: maxAge *1000}) //*1000 because cookie in miliseoncds
    res.status(201).json({user: user._id})
    }
    catch (err) {
      const errorss = handleErrors(err)
      res.status(400).json({errorss})
    }
  }
  
  module.exports.login_post = async (req, res) => {
    const {email, password} = req.body
    try {
      const user = await User.login(email, password) // login statis method
      // takes in username and pass does its check and returns the user if it passes.
      const token = createToken(user._id)
      res.cookie('b21', token, {httpOnly: true, maxAge: maxAge *1000})
      res.status(201).json({user: user._id})
    }
    catch (err) {
      const errorss = handleErrors(err)
      res.status(400).json({error: errorss})
    }
    
  }

  module.exports.logout_get = (req,res) => {
    res.cookie('b21', '', {maxAge: 1})
    res.redirect('/')
  } 