const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.PUERTO || 4000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/datosJson', (req, res) => {
    const datosRecibidos = req.body
    if (datosRecibidos) {
        res.status(200).json({mensaje: "datos recibidos correctamente"})
    }
    res.status(500).json({Mensaje: "no se recibieron datos"})
});

app.post('/formulario', (req, res) => {
    //const datos = req.body
    const usuario = req.body.usuarios
    res.json({datos:usuario})
})

app.listen(port, () => {console.log(`servidor en http://localhost:${port}`); });