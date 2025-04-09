const app = require('./app')
require('dotenv').config()
const connectDb = require('./config/db')
const port =  process.env.port || 6300
connectDb();



app.listen(port,()=>{
    console.log(`🚀server is running on port http://localhost:${port}`)
})