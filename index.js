const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Crear el servidor de Express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Publico
// app.use(express.static("public"));
app.use(
  express.static(path.resolve(__dirname + "/public/index.html"), {
    extensions: ["js"],
  })
);

// Lectura y parseo del body
app.use(express.json());

// Rutas
// auth // crear, login, renew token
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Escuchar peticiones
app.listen(process.env.PORT || 4000, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
