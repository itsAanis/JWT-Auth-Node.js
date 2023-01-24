const jwt = require('jsonwebtoken')
require('dotenv').config()


const requireAuth = (req,res,next) => {
    const token = req.cookies.b21 //b21 name of cookie

    //
 if(token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {  // 
        if(err) {
            console.log(err.message)
            res.redirect('/login')}   
        else {
            next()}
        })}
        
        else {
        res.redirect('/login')}  // if no cookie redirects to login screen
}

module.exports = {requireAuth}
