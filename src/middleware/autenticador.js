const jsonwebtoken = require('jsonwebtoken')
const autenticarToken = (req, res, next) => {
    const token = req.headers["autenticacion"]?.split(" ")[1]
    if (!token) {
        res.status(401).json({error: "acceso denegado, no provee token."})
    }
}

jwt.verify(token, process.env.jwt_secret, (error, usuario) => {
    if (error) {
        res.status(403).json({ error: "token invalido"});
        req.usuario = usuario
        next();
    }
});

module.exports = autenticarToken