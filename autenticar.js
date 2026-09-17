const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    const cabecera = req.headers.authorization || req.headers.autenticacion;

    if (!cabecera) {
        return res.status(401).json({ error: 'Acceso denegado, no provee token.' });
    }

    const token = cabecera.startsWith('Bearer ') ? cabecera.split(' ')[1] : cabecera;

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, formato de token inválido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || process.env.jwt_secret, (error, usuario) => {
        if (error) {
            return res.status(403).json({ error: 'Token inválido.' });
        }

        req.usuario = usuario;
        next();
    });
};

module.exports = autenticarToken;