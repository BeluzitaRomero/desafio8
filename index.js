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

//READ
// app.get("/all", async (req, res) => {
//   res.send(await container.getAll());
// });

// app.get("/get/:id", async (req, res) => {
//   res.status(200).send(await container.getById(req.params.id));
// });

//CREATE
// app.post("/", async (req, res) => {
//   const product = {
//     title: req.body.title,
//     price: req.body.price,
//     img: req.body.img,
//   };

//   res.status(200).send(await container.save(product));
// });

//UPDATE
// app.put("/update/:id", async (req, res) => {
//   res.status(200).send(await container.updateProduct(req.body, req.params.id));
// });

//DELETE
// app.delete("/del/:id", async (req, res) => {
//   res.status(200).send(await container.deleteById(req.params.id));
// });

app.listen(8080, () => {
  console.log("Server run on port 8080");
});
