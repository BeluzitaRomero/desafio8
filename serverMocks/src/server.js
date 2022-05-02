const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoute = require("./routers/user.router.js");
app.use("/api/usuarios/", new UserRoute()); //instancia de Router

const PORT = 4000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port http:localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));
