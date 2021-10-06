const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('base de datos nice')
    }catch(error){
        console.log(error);
        throw new Error('error a la hora de iniciar la bd')
    }
}
module.exports={
    dbConnection
}