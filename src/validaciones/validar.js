// Función para validar que el nombre tenga más de 3 caracteres
const validarNombre = (nombre) => {
    return typeof nombre === 'string' && nombre.trim().length > 3;
};

// Función para validar el formato de correo electrónico
const validarCorreo = (correo) => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof correo === 'string' && regexCorreo.test(correo);
};

// Función principal que agrupa todas las validaciones
const validarCampos = (req, res, next) => {
    const { nombre, correo } = req.body;

    if (!validarNombre(nombre)) {
        return res.status(400).json({
            error: "El nombre debe tener más de 3 letras."
        });
    }

    if (!validarCorreo(correo)) {
        return res.status(400).json({
            error: "El formato de correo electrónico no es válido."
        });
    }

    next();
};

module.exports = {
    validarCampos
};