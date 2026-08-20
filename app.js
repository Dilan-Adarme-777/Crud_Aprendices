const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.PUERTO || 4000;
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivoJson = ruta.join(__dirname, 'ListaDatos.json');


app.get('/', (req, res) => {
    res.send('API RESTFUL = CRUD aprendices');
});

app.get('/api/aprendices', (req, res) => {
    // const listaAprendices = []
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            res.status(505).json({Error: "error al leer el archivo, conexion con la base de datos"})
        }
        const listaAprendices = JSON.parse(datos);
        res.json(listaAprendices);

    });
});

app.listen(port, () => {console.log(`servidor en http://localhost:${port}`); });