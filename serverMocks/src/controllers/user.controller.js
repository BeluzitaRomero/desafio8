const UserService = require("../services/user.services");

class UserController {
  constructor() {
    this.userService = new UserService();
    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async createUser(req, res) {
    const { cant } = req.query;
    try {
      const response = await this.userService.createUser(cant);
      res.status(200).json({ response });
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(req, res) {
    let id = null;
    if (req.query.id) id = req.query.id;
    try {
      const response = await this.userService.getUsers(id);
      res.status(200).json({ usuarios: response });
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(req, res) {
    try {
      await this.userService.addUser();
      res.status(200).send(`Usuario agregado`);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      const response = await this.userService.updateUser(id, body);
      res.status(200).send(`Ùsuario actualizado`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(id);
      res.status(200).send(`Usuario eliminado`);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
