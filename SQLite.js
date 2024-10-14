const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./usuarios.db'); // Crear o usar la base de datos

// Crear la tabla de usuarios si no existe
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    dpi TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);