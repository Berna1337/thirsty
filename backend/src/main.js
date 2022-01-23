const { connectToMongo, createDocument, createSession, getCollection, findDocumentById, deleteDocumentById, updateDoc, findDocumentByEmail } = require("./db")
const { MongoClient, ObjectId } = require('mongodb')
const express = require("express")
const app = express()
const port = process.env.PORT ?? 3025

connectToMongo()

app.use(express.json())

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`));

app.post("/signup", async (req, res) => {
    if (validateEmail(req.body.email) && await emailAvaiable(req.body.email) && (checkPasswordStrength(req.body.password) === 4) && (req.body.password == req.body.passwordConfirmation) && req.body.acceptsTerms) {
        const id = new ObjectId()
        await createDocument({_id: id, ...req.body})
        console.log(id)
        res.status(201).json({ message: "Utilizador Criado com Sucesso!", _id: id})
    }
    else {
        const resposta = {
            message: "Os dados introduzidos não são válidos.",
            errors: {

            }
        }
        if (req.body.email.length === 0) resposta.errors.email = "Por favor introduza o seu endereço de email."
        else if (!validateEmail(req.body.email)) resposta.errors.email = "Por favor introduza um endereço de email válido."
        if ( !await emailAvaiable(req.body.email)) resposta.errors.email = "O endereço introduzido já está registado."
        if (checkPasswordStrength(req.body.password) < 4) {
            if (req.body.password.length === 0) resposta.errors.password = "Por favor introduza a sua password."
            else if (req.body.password.length < 8) resposta.errors.password = "A sua password deve ter no mínimo 8 caracteres."
            else resposta.errors.password = "A sua password deve ter pelo menos um número, uma mínuscula, uma maiúscula e um símbolo."
        }
        if (req.body.passwordConfirmation.length === 0) resposta.errors.passwordConfirmation = "Por favor introduza novamente a sua password."
        else if (req.body.password !== req.body.passwordConfirmation) resposta.errors.passwordConfirmation = "As passwords não coincidem."
        if (!req.body.acceptsTerms) resposta.errors.acceptsTerms = "Tem de aceitar os termos e condições para criar a sua conta."
        res.status(400).json(resposta)
        console.log(resposta)
    }
})

app.post("/login", async (req, res) => {
    if (await emailAvaiable(req.body.email)) res.status(404).json({ message: "O email ou password estão incorretos" })
    else if (await validateLogin(req.body.email, req.body.password)) {
        const user = await findDocumentByEmail(req.body.email)
        const token = await generateToken(req.body.email)
        delete user.password
        delete user.passwordConfirmation
        delete user.acceptsTerms
        await createSession({token, ...user})
        res.status(200).json({token})
    }  
    else if (validatePassword(req.body.email, req.body.password)) res.status(401).json({ message: "O email ou password estão incorretos" })
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








function validateEmail(email) {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(email)
}

async function emailAvaiable(email) {
    const check = await findDocumentByEmail(email)
    return !check ? true : false
}

function checkPasswordStrength(password) {
    if (password.length < 8) return 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /[~!@#$%^&*)(+=._-]/
    ]
    return regexes
        .map(re => re.test(password))
        .reduce((score, t) => t ? score + 1 : score, 0)
}

async function validateLogin(email, password) {
    const user = await findDocumentByEmail(email)
    return user.email == email && user.password == password ? true : false
}

async function validatePassword(email, password) {
    const user = await findDocumentByEmail(email)
    return user.email == email && user.password != password ? true : false
}

async function generateToken(email) {
    const user = await findDocumentByEmail(email)
    return ObjectId(user._id)
}