const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')
//destructure isEmail from validator package.
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },  //   2nd is message to send if error
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],//2nd parameter is for the message to send back
    },
})
userSchema.pre('save',  async function (next) {
    const salt = await bcrypt.genSalt() // function is async
    this.password = await bcrypt.hash(this.password, salt)  
next()    
})

//static method to log in
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email:email})
    //method will be used by model to check the database.
    if (!user) { 
         throw Error('incorrect email')
          }
        const auth = await bcrypt.compare(password, user.password)// will hash and compare under the hood
    if (!auth) {
        throw Error(' incorrect password')
        }
      return user  
    }

const User = mongoose.model('autho', userSchema)

module.exports = User