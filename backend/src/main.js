const { createDocument, getCollection, findDocumentById, deleteDocumentById, updateDoc } = require(".db")
const express = require("express")
const app = express()
const port = process.env.PORT ?? 3001

app.use(express.json())

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`));

app.post("/signup", (req, res) => {
    
})

app.post("/login", (req, res) => {

})

app.post("/submitForm", (req, res) => {

})

app.post("/submitWater", (req, res) => {

})

app.get("/objective", (req, res) => {

})

app.post("/post", (req, res) => {

})

app.get("/allmydata", (req, res) => {

})

app.delete("/delete", (req, res) => {

})