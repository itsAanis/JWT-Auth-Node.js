const jwt = require('jsonwebtoken')
require('dotenv').config()


const requireAuth = (req,res,next) => {
    const token = req.cookies.b21 //b21 name of cookie

    
 if(token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {  // method on jwt package
        if(err) {           //2nd arguement is secret // 3rd is function takes in decoded token
            console.log(err.message)
            res.redirect('/login')}   // error back to login screen
        else {
            next()}   // verified
        })}
        
        else {
        res.redirect('/login')}  // if no cookie redirects to login screen
}

module.exports = {requireAuth}
