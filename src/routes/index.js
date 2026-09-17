const {Router} = require("express")
const pruebaRouter = require("./pruebaRouter")
const enrutador = Router()
const autenticarRouter = require("./autenticadorRouter")

enrutador.use("/rutaPrueba", pruebaRouter)
enrutador.use("/autenticar", autenticarRouter)

module.exports = enrutador