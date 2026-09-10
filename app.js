const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT || 3000;
const registroMiddleware = require('./middleware/registroMiddleware');
const { validarCampos } = require('./validacion/validar');
const autenticar = require('./middleware/autenticador');
const manejadorErrores = require('./manejadorErrores');
const Token = jwtoken.sing()

const directorioImagenes = path.join(__dirname, 'misImagenes');
const rutaArchivoJson = path.join(__dirname, 'lista_datos.json');

const usuarioValido = {
  usuario: 'johan',
  clave: '12345'
};

if (!fs.existsSync(directorioImagenes)) {
  fs.mkdirSync(directorioImagenes, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const tiempoMilisegundos = Date.now();
  console.log(`tiempo:${tiempoMilisegundos}`);
  next();
});

app.use(registroMiddleware);

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => cb(null, directorioImagenes),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const cargar = multer({ storage: almacenamiento });

const leerAprendices = () => {
  const datos = fs.readFileSync(rutaArchivoJson, 'utf-8');
  return JSON.parse(datos);
};

const guardarAprendices = (lista) => {
  fs.writeFileSync(rutaArchivoJson, JSON.stringify(lista, null, 2));
};

app.get('/', (req, res) => {
  res.send('Servidor inicializado correctamente');
});

app.post('/login', (req, res) => {
  const { usuario, clave } = req.body;
  const Usuariobd = {
    usuario: 'dilan',
    clave: '123456'
  };

  if (!usuario || !clave) {
    return res.status(400).json({ error: 'Debe enviar usuario y clave.' });
  }

  if (usuario === Usuariobd.usuario && clave === Usuariobd.clave) {
    return res.status(200).json({
      mensaje: 'Inicio de sesión correcto',
      usuario: Usuariobd.usuario
    });
  }

  return res.status(401).json({ error: 'usuario y/o clave incorrectos' });
});

const token = jwtoken.sing(
  
)

app.post('/rutaprotegida', (req, res) => {
  const { usuario, clave } = req.body;
  const Usuariobd = {
    usuario: 'johan',
    clave: '123456'
  };

  if (!usuario || !clave) {
    return res.status(400).json({ error: 'Debe enviar usuario y clave.' });
  }

  if (usuario === Usuariobd.usuario && clave === Usuariobd.clave) {
    return res.status(200).json({
      mensaje: 'Acceso permitido',
      usuario: Usuariobd.usuario
    });
  }

  return res.status(401).json({ error: 'usuario y/o clave incorrectos' });
});

app.get('/aprendices', (req, res) => {
  try {
    const listaAprendices = leerAprendices();
    res.json(listaAprendices);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los aprendices' });
  }
});

app.get('/aprendices/:dni', (req, res) => {
  const dniBusqueda = String(req.params.dni);

  try {
    const listaAprendices = leerAprendices();
    const aprendizEncontrado = listaAprendices.find((aprendiz) => String(aprendiz.dni) === dniBusqueda);

    if (!aprendizEncontrado) {
      return res.status(404).json({ error: 'Aprendiz no encontrado' });
    }

    return res.json(aprendizEncontrado);
  } catch (error) {
    return res.status(500).json({ error: 'Error al procesar los datos' });
  }
});

app.post('/aprendices', cargar.single('imagen'), validarCampos, (req, res) => {
  try {
    const datosAprendiz = req.body;
    const listaAprendices = leerAprendices();
    const ultimoDni = listaAprendices.reduce((max, aprendiz) => Math.max(max, Number(aprendiz.dni) || 0), 0);

    const nuevoAprendiz = {
      dni: ultimoDni + 1,
      ...datosAprendiz,
      avatar: req.file ? `/misImagenes/${req.file.filename}` : 'sin imagen'
    };

    listaAprendices.push(nuevoAprendiz);
    guardarAprendices(listaAprendices);

    return res.status(201).json(nuevoAprendiz);
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo registrar el aprendiz.' });
  }
});

app.put('/aprendices/:dni', validarCampos, (req, res) => {
  const dniBusqueda = String(req.params.dni);

  try {
    let listaAprendices = leerAprendices();
    const indice = listaAprendices.findIndex((aprendiz) => String(aprendiz.dni) === dniBusqueda);

    if (indice === -1) {
      return res.status(404).json({ error: 'Aprendiz no encontrado' });
    }

    listaAprendices[indice] = {
      ...listaAprendices[indice],
      ...req.body
    };

    guardarAprendices(listaAprendices);
    return res.json({ mensaje: 'Aprendiz modificado con éxito', aprendiz: listaAprendices[indice] });
  } catch (error) {
    return res.status(500).json({ error: 'No se pudo actualizar el aprendiz.' });
  }
});

app.delete('/aprendices/:dni', (req, res) => {
  const dniBusqueda = String(req.params.dni);

  try {
    let listaAprendices = leerAprendices();
    const existe = listaAprendices.some((aprendiz) => String(aprendiz.dni) === dniBusqueda);

    if (!existe) {
      return res.status(404).json({ error: 'Aprendiz no encontrado' });
    }

    listaAprendices = listaAprendices.filter((aprendiz) => String(aprendiz.dni) !== dniBusqueda);
    guardarAprendices(listaAprendices);

    return res.json({ mensaje: 'Aprendiz eliminado con éxito' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el aprendiz' });
  }
});

app.use(manejadorErrores);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

