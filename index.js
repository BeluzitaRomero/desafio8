const express = require("express");
const knex = require("./db/db_products");
const Container = require("./controller/Container");
const container = new Container();
const app = express();

//para el post necesito parsear la info, uso el middleware
app.use(express.json());

//Routes
const productsRouter = require("./router/productRoutes");
app.use("/api/products", productsRouter);

app.listen(8080, () => {
  console.log("Server run on port 8080");
});
