const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "la descripcion es obligatoria"],
  },
  img: {
    type: String,
    required: [true, "la imagen es obligatoria"],
  },
  //campo para guardar la url para el boton
  url: {
    type: String,
    default: "",
  },
});
UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};
module.exports = model("Usuario", UsuarioSchema);
