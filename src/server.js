const app = require("./app")

const PUERTO = process.env.PUERTO || 4000

app.listen(PUERTO, ()=>{
    console.log(`SERVER http://localhost:${PUERTO}`)
})