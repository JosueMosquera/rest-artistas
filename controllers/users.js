const { response, request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const Usuario = require("../models/usuario");

const getUsers = async (req = request, res = response) => {
  const users = await Usuario.find();
  res.json({
    usuarios: users,
  });
};
const postUsers = async (req = request, res = response) => {
  const { nombre, descripcion } = req.body;
  //requerimos la imagen
  const {tempFilePath} = req.files.img

  const userDB = await Usuario.findOne({ nombre });
  if (userDB) {
    res.status(400).json({
      msg: `el nombre ${userDB.nombre} ya existe en la DB`,
    });
  } else {
    const data = {
      nombre,
      descripcion,
    };
    const usuario = await new Usuario(data);
    // si existe el archivo de la imagen la subimos a cloudinary
    if(tempFilePath){
      const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
      usuario.img = secure_url
    }
    //guardamos
    await usuario.save();
    res.render("thanks");
  }
};
module.exports = {
  postUsers,
  getUsers,
};
