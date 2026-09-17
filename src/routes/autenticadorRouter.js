const {Router} = require("express")
const enrutador = Router()

enrutador.get("/login", (req,res)=>{
    res.json({mensaje: "ruta de login"})
})

module.exports = enrutador

enrutador.post("/registro", (req,res)=>{
    res.json({mensaje: "ruta de registro"})
})