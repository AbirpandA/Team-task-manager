const mongoose = require('mongoose')
require('dotenv').config()


const connectDb=()=>{
    mongoose.connect(process.env.mongoDb_url)
    .then(()=>console.log('✅mongoDb connected'))
    .catch((err)=>console.log(err.message))
}

module.exports = connectDb