const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({

    name: { type: String, required: true },
    googleId:{type:String},
  
    email: { type: String, required: true },
    password: { type: String }



})


module.exports = mongoose.model('User' , userSchema)