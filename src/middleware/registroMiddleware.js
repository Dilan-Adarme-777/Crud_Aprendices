const registroMiddleware = (req, res, next) => {
    const inicio = Date.now();
    const fecha = new Date().toISOString();

    // El evento correcto es 'finish'
    res.on('finish', () => { 
        const duracion = Date.now() - inicio;
        // Ahora res estará disponible correctamente aquí
        console.log(fecha, 'respuesta', res.statusCode, duracion + 'ms');
    });

    next(); // Permite que la petición continúe a las rutas
};

module.exports = registroMiddleware;
