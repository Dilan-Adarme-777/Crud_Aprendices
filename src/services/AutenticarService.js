const jwtoken = require("jsonwebtoken")
const ingresar = (usuario, clave) => {

        const usuariobd ={
        usuario: 'dilan',
        clave: '123456'
    }
    
    if (usuario !== usuariobd.usuario || contrasena !== usuariobd.clave){
        res.json({mensaje: "usuario o contraseña incorrecta"})
    }

    const token = jwtoken.sign(
        {user:usuario},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
    )

    return token
}

module.exports = ingresar