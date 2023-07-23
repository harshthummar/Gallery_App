const app = require('./app')
require('dotenv').config();
console.log("port",process.env.PORT)
const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log('Server is up on port ',port)
})