//Config del knex
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "coderpractica",
  },
  pool: { min: 2, max: 8 },
});

knex.schema
  .createTableIfNotExists("products", function (table) {
    table.increments("id").primary();
    table.string("title");
    table.float("price");
    table.string("img");
  })
  .then(() => {
    console.log("Tabla creada");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = knex;
