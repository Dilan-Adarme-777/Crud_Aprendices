const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PUERTO || 7777;
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivoJson = ruta.join(__dirname, 'lista_datos.json');

app.get('/', (req, res) => {
    res.send('API RESTFUL = CRUD aprendices');
});

app.get("/api/aprendices", (req, res) => {
    const ListaAprendices = []
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
        return res.status(500).json({ error: "Error al leer el archivo, conexion bd" });
    }
    res.json(JSON.parse(datos));
    });
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
