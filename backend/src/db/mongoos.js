
const mongoose = require('mongoose')

try{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URL,{
        useUnifiedTopology: true,
    })
    console.log("db connected successfully")
}
catch(error)
{
    console.log(error.message)
}

