const {Router} = require("express")

const enrutador = Router()

enrutador.get("/3407184", (req,res)=>{
    res.json({mensaje: "ruta de pruebas 3407184"})
})


module.exports = enrutador