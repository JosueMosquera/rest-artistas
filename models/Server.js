const express = require("express");
const cors = require("cors");
const userRouter = require("../routes/user");
const { dbConnection } = require("../db/config");
const fileUpload = require('express-fileupload');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usersPath: "/",
    };
    this.conectarDb();
    this.app.use(cors());
    this.app.set('view engine','ejs')
    //Parseo y lectura del body
    this.app.use(express.json());
    this.middlewares();
    //rutas de la app
    this.routes();
  }
  async conectarDb() {
    await dbConnection();
  }
  routes() {
    this.app.use(this.paths.usersPath, userRouter);
  }
  listen(){
      this.app.listen(this.port)
  }
  middlewares(){
      this.app.use(express.static("public"));
      this.app.use(fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
        createParentPath:true
      }))
  }
}
module.exports=Server;
