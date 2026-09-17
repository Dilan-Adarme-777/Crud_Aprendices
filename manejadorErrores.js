const manejadorErrores = (error, req, res, next) => {
    const codigoEstado = error.statusCode || 500;
    const mensaje = error.message || 'Error inesperado';

    console.error(`Hubo un error: ${new Date().toISOString()} - ${codigoEstado} - ${mensaje}`);

    if (res.headersSent) {
        return next(error);
    }

    const respuesta = {
        estado: 'ERROR',
        codigoEstado,
        mensaje
    };

    if (process.env.NODE_ENV === 'development' && error.stack) {
        respuesta.stack = error.stack;
    }

    return res.status(codigoEstado).json(respuesta);
};

module.exports = manejadorErrores;