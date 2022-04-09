const express = require("express");
const { Router } = express;
const router = new Router();

const Container = require("../controller/Container");
const container = new Container();

// let admin = true;

router.get("/:id?", async (req, res) => {
  const id = req.params.id;
  const prodExists = await container.getById(id);

  if (!id) {
    res.status(200).json(await container.getAll());
  } else if (prodExists) {
    res.status(200).json(await container.getById(req.params.id));
  } else {
    res.status(400).send({ error: "Producto no econtrado" });
  }
});

router.post("/", async (req, res) => {
  res.status(200).send(await container.save(req.body));
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const prodExists = await container.getById(id);
  if (prodExists) {
    res
      .status(200)
      .send(await container.updateProduct(req.body, req.params.id));
  } else {
    res.status(400).send({ error: "No existe el producto a modificar" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const prodExists = await container.getById(id);

  if (prodExists) {
    res.status(200).send(await container.deleteById(req.params.id));
  } else {
    res
      .status(400)
      .send({ error: "El producto que quiere eliminar no existe" });
  }
});

module.exports = router;
