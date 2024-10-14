import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

interface Usuario {
  dpi: string;
  name: string;
  email: string;
  password: string;
}

let usuarios: Usuario[] = [];

// Crear firma
const action = (request: express.Request, response: express.Response): void => {
  const token = jwt.sign({ user: "Sergio" }, process.env.CLAVE as string);
  response.status(200).json({ token });
};

app.get("/", action);

const mdw = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log(req.headers["token"]);
  jwt.verify(req.headers["token"] as string, process.env.CLAVE as string, (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    console.log(decode);
    next();
  });
};

// Endpoint para crear un nuevo usuario
app.post("/users", (req: express.Request, res: express.Response) => {
  const { dpi, name, email, password } = req.body as Usuario;

  const usuarioExistente = usuarios.find((u) => u.dpi === dpi);
  if (usuarioExistente) {
    return res.status(400).json({ error: "El DPI ya está registrado." });
  }

  const nuevoUsuario: Usuario = { dpi, name, email, password };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Listar todos los usuarios
app.get("/users", (req: express.Request, res: express.Response) => {
  res.status(200).json(usuarios);
});

// Actualizar usuario a base del DPI
app.put("/users/:dpi", (req: express.Request, res: express.Response) => {
  const dpi = req.params.dpi;
  const { name, email, password } = req.body as Usuario;

  // Validar si el usuario con el DPI existe
  const indiceUsuario = usuarios.findIndex((u) => u.dpi === dpi);
  if (indiceUsuario === -1) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  // Actualizar los campos del usuario
  const usuario = usuarios[indiceUsuario];
  if (name) usuario.name = name;
  if (email) usuario.email = email;
  if (password) usuario.password = password;

  res.status(200).json(usuario);
});

// Eliminar usuario a base del número DPI
app.delete("/users/:dpi", (req: express.Request, res: express.Response) => {
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

// Escuchar en puerto
app.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor escuchando por el puerto ${process.env.PORT || 3001}`);
});