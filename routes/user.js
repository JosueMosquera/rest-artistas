const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, postUsers } = require("../controllers/users");
const { existeUsuarioID } = require("../helpers/db-validators");
const { validarArchivo } = require("../middlewares/validarArchivo");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();
router.get("/api/users",getUsers);
router.get('/',(req,res)=>{
  res.render('index');
})
router.post(
  "/api/users",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "la descripcion es obligatoria").not().isEmpty(),
    validarCampos,
    validarArchivo
  ],
  postUsers
);
module.exports = router;
