const app = require('./app')
require('dotenv').config()
const port =  process.env.port || 6300



app.listen(port,()=>{
    console.log(`🚀server is running on port http://localhost:${port}`)
})