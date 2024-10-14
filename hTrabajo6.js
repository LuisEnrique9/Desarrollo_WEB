"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var usuarios = [];
// Crear firma
var action = function (request, response) {
    var token = jsonwebtoken_1.default.sign({ user: "Sergio" }, process.env.CLAVE);
    response.status(200).json({ token: token });
};
app.get("/", action);
var mdw = function (req, res, next) {
    console.log(req.headers["token"]);
    jsonwebtoken_1.default.verify(req.headers["token"], process.env.CLAVE, function (err, decode) {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }
        console.log(decode);
        next();
    });
};
// Endpoint para crear un nuevo usuario
app.post("/users", function (req, res) {
    var _a = req.body, dpi = _a.dpi, name = _a.name, email = _a.email, password = _a.password;
    var usuarioExistente = usuarios.find(function (u) { return u.dpi === dpi; });
    if (usuarioExistente) {
        return res.status(400).json({ error: "El DPI ya está registrado." });
    }
    var nuevoUsuario = { dpi: dpi, name: name, email: email, password: password };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});
// Listar todos los usuarios
app.get("/users", function (req, res) {
    res.status(200).json(usuarios);
});
// Actualizar usuario a base del DPI
app.put("/users/:dpi", function (req, res) {
    var dpi = req.params.dpi;
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    // Validar si el usuario con el DPI existe
    var indiceUsuario = usuarios.findIndex(function (u) { return u.dpi === dpi; });
    if (indiceUsuario === -1) {
        return res.status(404).json({ error: "Usuario no encontrado." });
    }
    // Actualizar los campos del usuario
    var usuario = usuarios[indiceUsuario];
    if (name)
        usuario.name = name;
    if (email)
        usuario.email = email;
    if (password)
        usuario.password = password;
    res.status(200).json(usuario);
});
// Eliminar usuario a base del número DPI
app.delete("/users/:dpi", function (req, res) {
    var dpi = req.params.dpi;
    // Validar si el usuario con el DPI existe
    var indiceUsuario = usuarios.findIndex(function (u) { return u.dpi === dpi; });
    if (indiceUsuario === -1) {
        return res.status(404).json({ error: "Usuario no encontrado." });
    }
    // Eliminar el usuario
    usuarios.splice(indiceUsuario, 1);
    res.status(200).json({ mensaje: "Usuario eliminado correctamente." });
});
// Escuchar en puerto
app.listen(process.env.PORT || 3001, function () {
    console.log("Servidor escuchando por el puerto ".concat(process.env.PORT || 3001));
});
