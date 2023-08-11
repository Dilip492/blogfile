const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({

   

    title: { type: String, required: true },
    description: { type: String, required: true },
    image:{type:String},
    category: { type: String, required: true },
    // imageUrl: { type: String, required: true }
    userId: { type: Schema.Types.ObjectId, ref: 'User'}



})


module.exports = mongoose.model('Blog', blogSchema)