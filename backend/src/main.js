const { connectToMongo, createDocument, createSession, getCollection, findDocumentById, deleteDocumentById, updateDoc, findDocumentByEmail, findSessionByEmail, findSessionByToken, deleteSessionByEmail, addWater } = require("./db")
const { MongoClient, ObjectId } = require('mongodb')
const express = require("express")
const app = express()
const port = process.env.PORT ?? 3025
const bcrypt = require('bcrypt');
const saltRounds = 10;

connectToMongo()

app.use(express.json())

app.listen(port, () => console.log(`À escuta em http://localhost:${port}`));

app.post("/signup", async (req, res) => {
    if (validateEmail(req.body.email) && await emailAvaiable(req.body.email) && (checkPasswordStrength(req.body.password) === 4) && (req.body.password == req.body.passwordConfirmation) && req.body.acceptsTerms) {
        const user = req.body
        const passEncrypted = bcrypt.hashSync(req.body.password, saltRounds);
        user.email = user.email.toLowerCase()
        user.password = passEncrypted
        delete user.passwordConfirmation
        const id = new ObjectId()
        await createDocument({_id: id, ...user})
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
        await handleSessions(req.body.email)
        const user = await findDocumentByEmail(req.body.email)
        const token = await generateToken()
        delete user.password
        delete user.passwordConfirmation
        delete user.acceptsTerms
        delete user.waterData
        delete user.userData
        delete user.objective
        delete user.achievements
        delete user.premium
        delete user.tournament
        delete user.posts
        delete user.karma
        await createSession({token, ...user})
        res.status(200).json({token})
    }  
    else if (validatePassword(req.body.email, req.body.password)) res.status(401).json({ message: "O email ou password estão incorretos" })
})

// app.use("/", async function (req, res, next) {
//     const checkToken = await findSessionByToken(req.headers.authorization)
//     if (!checkToken) res.status(404).json({ message: "Não existe nenhuma sessão com este token."})
//     next()
// })

app.get("/user", async (req, res) => {
    const checkToken = await findSessionByToken(req.headers.authorization)
    if (!checkToken) res.status(403).json({ message: "Não existe nenhuma sessão com este token."})
    else res.sendStatus(200)
})

app.post("/api/submitForm", async (req, res) => {
    const resposta = {
        message: "Os dados introduzidos não são válidos.",
        errors: {

        }
    }
    if (req.body.name.length == 0) resposta.errors.name = "Por favor introduza o seu nome."
    if (req.body.age.length == 0 || Number(req.body.age) < 0 || Number(req.body.age) > 130) resposta.errors.age = "Por favor introduza uma idade válida."
    if (req.body.weight.length == 0 || Number(req.body.weight) < 0 || Number(req.body.weight) > 600) resposta.errors.weight = "Por favor introduza um peso válido."
    if (req.body.height.length == 0 || Number(req.body.height) < 0 || Number(req.body.height) > 300) resposta.errors.weight = "Por favor introduza um peso válido."
    if (Object.keys(resposta.errors).length == 0) {
        const session = await findSessionByToken(req.headers.authorization)
        const user = await findDocumentByEmail(session.email)
        const obj = {userData: {...req.body}}
        const update = await updateDoc(user, obj)
        return update
    }
    else {
        res.status(400).json(resposta)
    }
})

app.get("/api/checkProfile", async (req, res) => {
    const user = await findDocumentByEmail(req.body.email)
    !user.userData ? res.status(404).json({ message: "Os dados do Perfil não se encontram preenchidos."}) : res.sendStatus(200)
})

app.post("/api/submitWater", async (req, res) => {
    const session = await findSessionByToken(req.headers.authorization)
    const user = await findDocumentByEmail(session.email)
    if (!session) res.sendStatus(403)
    else {
        const obj = {waterData: {...req.body}}
        const pushWater = await addWater(user, obj)
        res.sendStatus(201)
        return pushWater
    }
})

app.get("/api/getWater", async (req, res) => {
    
})

app.get("/api/objective", (req, res) => {

})

app.post("/api/post", (req, res) => {

})

app.get("/api/allmydata", (req, res) => {

})

app.delete("/api/delete", (req, res) => {

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
    return bcrypt.compareSync(password, user.password);
}

async function validatePassword(email, password) {
    const user = await findDocumentByEmail(email)
    return user.email == email && user.password != password ? true : false
}

async function generateToken() {
    return String(new ObjectId())
}

async function handleSessions(email) {
    const existeSession = await findSessionByEmail(email)
    if (existeSession) {
        await deleteSessionByEmail(email)
    }
}