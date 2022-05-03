const express = require("express");
const Container = require("./controller/Container");
const container = new Container();
const knex = require("./db/configSQLite");
const app = express();

//para el post necesito parsear la info, uso el middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Estaticos
app.use("/static", express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

//Routes
const productsRouter = require("./router/productRoutes");
app.use("/api/products", productsRouter);

//PUG DESAFIO 11
const renderProducts = require("./productos-test");
app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/api/productos-test", async (req, res) => {
  res.render("productos-test", { data: await renderProducts() });
});

//Servidor
const http = require("http");
const server = http.createServer(app);

//Socket
const io = require("socket.io")(server);

//CHAT------------------------------------------

io.on("connection", async (socket) => {
  console.log("💻 Nuevo usuario conectado!");
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });

  //Buscar mensajes guardados en back
  const msgs = await knex
    .from("chats_ecommerce")
    .select("*")
    .orderBy("created_at", "desc")
    .limit(10);
  //Enviar msg al front
  io.sockets.emit("messages_back", msgs);

  //Guardar los msg del front
  socket.on("sendMessage", async (data) => {
    data.created_at = new Date().toLocaleString();
    await knex("chats_ecommerce").insert(data); //guardar en db
    const newChat = await knex("chats_ecommerce")
      .select("*")
      .orderBy("created_at", "desc")
      .limit(10);
    io.sockets.emit("messages_back", newChat); //msg a todos los usuarios
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
