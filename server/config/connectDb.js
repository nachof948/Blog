const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
    const resultado =  await mongoose.connect(process.env.MONGO_URL)
    console.log(`Se conecto la base de datos: ${resultado.connection.host} `)
    }
    catch(error){
        console.log(error)
    }       
}
module.exports = connectDb