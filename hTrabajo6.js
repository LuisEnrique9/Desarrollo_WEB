const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [];

// Endpoint para crear un nuevo usuario
app.post("/users", (req, res) => {
  const { dpi, name, email, password } = req.body;

  // Valida que el DPI no se repita
  const usuarioExistente = usuarios.find((u) => u.dpi === dpi);
  if (usuarioExistente) {
    return res.status(400).json({ error: "El DPI ya está registrado." });
  }

  // Crear un nuevo usuario
  const nuevoUsuario = { dpi, name, email, password };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// El metodo GET lista todos los registros en formato json
app.get("/users", (req, res) => {
  res.status(200).json(usuarios);
});

// El metodo PUT actualiza usuario a base del DPI
app.put("/users/:dpi", (req, res) => {
  const dpi = req.params.dpi;
  const { name, email, password } = req.body;

  // Validar si el usuario con el DPI existe
  const usuario = usuarios.find((u) => u.dpi === dpi);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  // Actualizar los campos del usuario
  if (name) usuario.name = name;
  if (email) usuario.email = email;
  if (password) usuario.password = password;

  res.status(200).json(usuario);
});

// Metodo DELTE elimina usuario a base del número DPI
app.delete("/users/:dpi", (req, res) => {
  const dpi = req.params.dpi;

  // Validar si el usuario con el DPI existe
  const indiceUsuario = usuarios.findIndex((u) => u.dpi === dpi);
  if (indiceUsuario === -1) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  // Eliminar el usuario
  usuarios.splice(indiceUsuario, 1);
  res.status(200).json({ mensaje: "Usuario eliminado correctamente." });
});

// Servidor escuchando en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor escuchando por el puerto 3000");
});