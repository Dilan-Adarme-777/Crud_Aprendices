const manejadorErrores =(error ,req,res,next)=>{
    const codigoEstado =error.ststusCode || 500
    const mensaje = error.message || "error inesperado"
    console.error(`hubo un error: ${new Date().toISOString()} - ${codigoEstado} - ${mensaje}`);
    if (res.headersSent) {
        return next(error);
    }

    return res.status(codigoEstado).json({ error: mensaje});   
};

res.json({
    estado:"ERROR",
    CodigoEstado,
    mensaje,

    ...manejadorErrores(ProcessingInstruction.env.NODE_ENV === 'development' && {stack: error.stack})
})

module.exports = manejadorErrores