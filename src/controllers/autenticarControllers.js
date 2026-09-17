const jwtoken = require("jsonwebtoken")
const ingresar = (usuario, clave) => require("../services/AutenticarService");
const iniciarSesion = async (req, res) => {
    const {usuario, clave} = req.body
    const token = ingresar(usuario, clave)
    res.json({token})
}

module.exports = iniciarSesion