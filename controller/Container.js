const productsMysql = require("../db/db_products.js");

class Container {
  constructor() {
    this.knex = productsMysql;
  }

  async getAll() {
    try {
      const allProducts = await this.knex.from("products").select("*");
      return allProducts;
    } catch (err) {
      console.log("No hay productos");
      return null;
    }
  }

  async save(product) {
    await this.knex("products")
      .insert(product)
      .then(() => {
        console.log("Registro guardado");
        return { message: "Producto guardado" };
      })
      .catch((err) => {
        return err;
      });
  }

  async getById(id) {
    try {
      const product = await this.knex
        .from("products")
        .select("title", "price", "img")
        .where("id", id);
      return product[0];
    } catch {
      //NO ME ANDA
      console.log("error");
    }
  }

  async deleteById(id) {
    try {
      const prod = await this.knex("products").where("id", id).del();
      if (prod) {
        console.log("Producto eliminado");
        return { message: "Producto Eliminado" };
      }
    } catch {
      //no anda
      console.log("error");
    }
  }

  //   async deleteAll() {
  //     await fs.writeFile(this.file, "[]");
  //   }

  async updateProduct(product, id) {
    try {
      const prod = await this.knex("products").where("id", id).update({
        title: product.title,
        price: product.price,
        img: product.img,
      });
      return { message: "Producto modificado" };
    } catch {
      //no anda
      console.log("error");
    }
  }
}

module.exports = Container;
