const express = require("express");
const UserController = require("../controllers/user.controller.js");

class UserRoute extends express.Router {
  constructor() {
    super();
    this.userController = new UserController();

    this.post("/popular", this.userController.createUser);
    // En estas rutas no hace falta poner los parentesis del
    //metodo createUser xq se sabe que recibe en el controller la request y response
    this.get("/", this.userController.getUsers);
    this.post("/", this.userController.addUser);
    this.put("/:id", this.userController.updateUser);
    this.delete("/:id", this.userController.deleteUser);
  }
}

module.exports = UserRoute;
