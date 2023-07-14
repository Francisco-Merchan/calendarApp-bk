const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const { dbConnection } = require("./database/config");

// Crear el servidor de Express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Publico
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public"), { extensions: ["js"] }));

// Agrega los siguientes encabezados para permitir el uso de módulos JavaScript
app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/javascript; charset=UTF-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Lectura y parseo del body
app.use(express.json());

// Rutas
// auth // crear, login, renew token
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

// Escuchar peticiones
app.listen(process.env.PORT || 4000, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
