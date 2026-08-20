const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PUERTO || 7777; 


app.get('/', (req, res) => {
    res.send('API RESTFUL = CRUD aprendices');
});


app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
