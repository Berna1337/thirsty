const express = require("express")
const app = express()
const port = process.env.PORT ?? 3001

app.use(express.json())

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`));

app.post("/signup", (req, res) => {
    
})

app.post("/login", (req, res) => {

})