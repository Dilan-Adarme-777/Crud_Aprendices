const {Router} = require("express")
const enrutador = Router()

const autenticarsesion = require("../controllers/autenticarControllers")

enrutador.get("/login", autenticarsesion)

enrutador.post("/registro", (req,res)=>{
    res.json({mensaje: "ruta de registro"})
})


module.exports = enrutador

