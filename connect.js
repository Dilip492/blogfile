const mongoose = require('mongoose')
require('dotenv').config()

const connectToDB = () => {

    mongoose.connect(process.env.MONGO_URI).then(() => console.log("connect to database succesfully")).catch((err) => console.log(err))
}

module.exports = connectToDB