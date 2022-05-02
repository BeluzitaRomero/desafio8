const generateUsers = require("../utils/user.utils.js");

class UserService {
  constructor() {
    this.users = [];
    this.lastId = 0;
  }
  async createUser(cant) {
    for (let i = 0; i < cant; i++) {
      const user = generateUsers();
      user.id = i + 1;
      this.users.push(user);
    }
    console.log(this.users);
    this.lastId = cant;
    return this.users;
  }

  async getUsers(id) {
    if (id) {
      return this.users.filter((user) => user.id === Number(id));
    } else {
      return this.users;
    }
  }

  async addUser() {
    const user = generateUsers();
    user.id = Number(this.lastId) + 1;
    this.lastId = user.id;
    this.users.push(user);
  }

  async updateUser(id, data) {
    if (this.users.length === 0) throw new Error("No hay data");
    let index = null;
    try {
      let usuario = this.users.filter((user, _index) => {
        if (user.id === Number(id)) {
          index = _index;
          return user;
        }
      })[0];
      Object.assign(usuario, data);
      this.users[index] = usuario;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id) {
    let index = null;
    try {
      this.users.filter((user, _index) => {
        if (user.id === Number(id)) {
          index = _index;
        }
        this.users.splice(index, 1);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;