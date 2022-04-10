const _knex = require("knex");

const knex = _knex({
  client: "better-sqlite3",
  connection: {
    filename: "./db/chat_ecommerce.sqlite",
  },
  userNullAsDefault: true,

  pool: { min: 2, max: 8 },
});

knex.schema
  .createTableIfNotExists("chats_ecommerce", function (table) {
    table.increments("id").primary();
    table.string("email");
    table.string("msg");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
  .then(() => {
    console.log("Tabla de chats conectada");
  })
  .catch((err) => {
    throw err;
  });

module.exports = knex;
