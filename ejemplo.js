const { faker } = require("@faker-js/faker");
const { urlencoded } = require("express");
const express = require("express");

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

const nombres = ["Belen", "Sergio", "Mariano", "Leonel", "Esteban"];
const apellidos = ["Lopez", "Vidal", "Rodriguez", "Lamas", "Gutierrez"];
const colores = ["Amarillo", "Rojo", "Azul", "Verde", "Violeta"];

// app.get("/test/:n", (req, res) => {
//   const users = [];
//   for (let i = 0; i < 10; i++) {
//     const user = {
//       nombre: nombres[Math.round(Math.random() * nombres.length - 1)],
//       apellido: apellidos[Math.round(Math.random() * nombres.length - 1)],
//       color: colores[Math.round(Math.random() * nombres.length - 1)],
//     };
//     users.push(user);
//   }
//   res.status(200).json({ users });
// });

//Con FAKER JS
app.get("/test/:n?", (req, res) => {
  const users = [];
  let n = req.params.n;

  if (n !== undefined) {
    for (let i = 0; i < n; i++) {
      const user = {
        id: i + 1,
        nombre: faker.name.findName(),
        apellido: faker.name.lastName(),
        color: faker.commerce.color(),
      };
      users.push(user);
    }
    res.status(200).json({ users });
  } else if (n === undefined) {
    for (let i = 0; i < 10; i++) {
      const user = {
        id: i + 1,
        nombre: faker.name.findName(),
        apellido: faker.name.lastName(),
        color: faker.commerce.color(),
      };
      users.push(user);
    }
    res.status(200).json({ users });
  }
});

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
server.on("error", (err) => {
  console.log(err);
});
