const User = require('../models/usuario');
const existeUsuarioID = async(id) =>{
    const existeUsuario=await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}
module.exports={
    existeUsuarioID
}