const express = require('express')
const app = express()
const port = 5000
const routerv1 = require("./routes/index")

app.use(express.json())

app.use("/api/v1", routerv1)


app.listen(port, ()=>{
    console.log(`Server Started on port ${port}`)
})