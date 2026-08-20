const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PUERTO || 4000;
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivoJson = ruta.join(__dirname, 'ListaDatos.json');

app.get('/', (req, res) => {
    res.send('API RESTFUL = CRUD aprendices');
});

const validarNombre = (req, res, next) => {
    if (req.body && req.body.nombre) {
        next(); // Si el nombre existe, continúa a la ruta
    } else {
        res.status(400).json({ error: "El nombre es obligatorio" });
    }
};

const validarCorreo = (req, res, next) => {
    if (req.body && req.body.correo) {
        next(); // Si el correo existe, continúa a la ruta
    } else {
        res.status(400).json({ error: "El correo es obligatorio" });
    }
};

app.get('/api/aprendices', (req, res) => { 
    sistemaArchivo.readFile(rutaArchivoJson,"utf-8",(error, datos) => {
        if (error) { return res.status(500).json({Error: "Error al leer el archivo"});
    }
    const listaAprendices = JSON.parse(datos);
    res.json(listaAprendices);
    });
});



app.get('/api/aprendices/:dni', (req, res) => {
    const dni = req.params.dni;
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) { return res.status(500).json({ Error: "Error al leer el archivo"});
    }
    const listaAprendices = JSON.parse(datos);
    const aprendiz = listaAprendices.find(aprendiz => aprendiz.dni === dni);
        if (aprendiz) {
            return res.status(404).json({Error: "Aprendiz no encontrado"});
        }
        res.json(aprendiz);
    });
});

app.post("/api/aprendices", (req, res) => {
    const datosAprendiz = req.body || {};
    if (validarNombre(datosAprendiz.nombre)) {
        return res.status(400).json({Error: "El nombre debe tener más de 3 letras"});
    }
    if (validarCorreo(datosAprendiz.correo)) {

        return res.status(400).json({
            Error: "El correo electrónico no es válido"
        });

    }
    sistemaArchivo.readFile(rutaArchivoJson,"utf-8",(error, datos) => {
        if (error) {
            return res.status(500).json({Error: "Error al leer el archivo"});
        }
        const listaAprendices = JSON.parse(datos);
        let nuevoDni;
        if (listaAprendices.length === 0) {
            nuevoDni = "1000001";
        } else {const ultimoAprendiz = listaAprendices[listaAprendices.length - 1];
            nuevoDni = String(Number(ultimoAprendiz.dni) + 1);
        }
        const nuevoAprendiz = {
            dni: nuevoDni,...datosAprendiz
        };
        listaAprendices.push(nuevoAprendiz);
        sistemaArchivo.writeFile(rutaArchivoJson,JSON.stringify(listaAprendices, null, 2),(error) => {
            if (error) {
                return res.status(500).json({Error: "No se puede ingresar el aprendiz"});
            }
            res.status(201).json(nuevoAprendiz);
        });
    });
});


app.patch("/api/aprendices/:dni", (req, res) => {
    const dni = req.params.dni;
    const datosAprendiz = req.body;
    sistemaArchivo.readFile(rutaArchivoJson,"utf-8",(error, datos) => {
        if (error) {
            return res.status(500).json({Error: "Error al leer el archivo"});
        }
        let listaAprendices = JSON.parse(datos);
        const indice = listaAprendices.findIndex(aprendiz => aprendiz.dni === dni);
        if (indice === -1) {
            return res.status(404).json({Error: "Aprendiz no encontrado"});
        }
        if (datosAprendiz.nombre &&validarNombre(datosAprendiz.nombre))
            {return res.status(400).json({Error: "El nombre debe tener 3 letras minimo"});
        }
        if (datosAprendiz.correo &&validarCorreo(datosAprendiz.correo))
            {return res.status(400).json({Error: "El correo no es válido"});
        }
        listaAprendices[indice] = {...listaAprendices[indice],...datosAprendiz,dni: dni};
        sistemaArchivo.writeFile(rutaArchivoJson,JSON.stringify(listaAprendices, null, 2),(error) => {
            if (error) {
                return res.status(500).json({Error: "No se puede actualizar el aprendiz"});
            }
            res.json(listaAprendices[indice]);
        });
    });
});

app.delete("/api/aprendices/:dni", (req, res) => {
    const dni = req.params.dni;
    sistemaArchivo.readFile(rutaArchivoJson,"utf-8",(error, datos) => {
        if (error) {
            return res.status(500).json({Error: "Error al leer el archivo"});
        }
        let listaAprendices = JSON.parse(datos);
        const aprendiz = listaAprendices.find(aprendiz => aprendiz.dni === dni);
        if (aprendiz) {return res.status(404).json({Error: "Aprendiz no encontrado"});
        }
        listaAprendices = listaAprendices.filter(aprendiz => aprendiz.dni !== dni);
        sistemaArchivo.writeFile(rutaArchivoJson,JSON.stringify(listaAprendices, null, 2),(error) => {
            if (error) {
                return res.status(500).json({Error: "No se puede eliminar el aprendiz"});
            }
            res.json({mensaje: "Aprendiz eliminado correctamente",aprendiz: aprendiz});
        });
    });
});

app.listen(port, () => {console.log(`servidor en http://localhost:${port}`);});