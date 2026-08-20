const express = require('express');
const app = express();
require('dotenv/config')
const port = process.env.PUERTO || 4000;

app.get('/', (req, res) => {
    res.send('API RESTFUL = CRUD aprendices');
});

app.listen(port, () => {console.log(`servidor en http://localhost:${port}`); });