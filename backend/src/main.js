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
    // req.user = await findDocumentById(checkToken._id)
    if (!checkToken) res.status(403).json({ message: "Não existe nenhuma sessão com este token."})
    else res.sendStatus(200)
})

app.post("/api/submitForm", Authorize, async (req, res) => {
    const resposta = {
        message: "Os dados introduzidos não são válidos.",
        errors: {

        }
    }
    console.log(req.user)
    if (req.body.name.length == 0) resposta.errors.name = "Por favor introduza o seu nome."
    if (req.body.age.length == 0 || Number(req.body.age) < 0 || Number(req.body.age) > 130) resposta.errors.age = "Por favor introduza uma idade válida."
    if (req.body.weight.length == 0 || Number(req.body.weight) < 0 || Number(req.body.weight) > 600) resposta.errors.weight = "Por favor introduza um peso válido."
    if (req.body.height.length == 0 || Number(req.body.height) < 0 || Number(req.body.height) > 300) resposta.errors.weight = "Por favor introduza um peso válido."
    if (Object.keys(resposta.errors).length == 0) {
        const obj = {userData: {...req.body}}
        const update = await updateDoc(req.user, obj)
        res.sendStatus(200)
        return update
    }
    else {
        res.status(400).json(resposta)
    }
})

app.get("/api/checkProfile", Authorize, async (req, res) => {
    // const user = await findDocumentByEmail(req.body.email)
    !req.user.userData ? res.status(404).json({ message: "Os dados do Perfil não se encontram preenchidos."}) : res.status(200).json(req.user.userData)
})

app.post("/api/submitWater", Authorize, async (req, res) => {
    const obj = {waterData: {...req.body}}
    const pushWater = await addWater(req.user, obj)
    res.sendStatus(201)
    return pushWater
})

app.post("/api/submitWaterDay", Authorize, async (req, res) => {
    let arr = req.user.waterDay.filter(e => e.day != req.body.day)
    arr.push(req.body)
    // const obj = {waterDay: {...req.body}}
    const pushWater = await updateDoc(req.user, {waterDay: arr})
    res.sendStatus(201)
    return pushWater
})

app.get("/api/getWater", Authorize, async (req, res) => {
    const hoje = formatDate(String(new Date()).slice(0, 15))
    const consumoDia = req.user.waterData.filter(e => e.day == hoje)
    const resposta = consumoDia.reduce((acc, e) => acc + e.value, 0)
    console.log(consumoDia)
    res.status(200).json(resposta)
})

app.get("/api/getWaterStats", Authorize, async (req, res) => {
    // const hoje = formatDate(String(new Date()).slice(0, 15))
    // const consumoSemana = req.user.waterDay//.filter(e => new Date(e.day).valueOf() >= (new Date(hoje).valueOf() - (86400000 * 7)))
    res.status(200).json(req.user.waterDay)
})

app.get("/api/name", Authorize, (req, res) => {
    res.status(200).json(req.user.userData.name)
})

app.get("/api/objective", Authorize, async (req, res) => {
    let obj = 0;
    const normal = 35 * req.user.userData.weight
    const imc = Math.round(req.user.userData.weight / ((req.user.userData.height / 100)**2))
    if (imc > req.user.userData.age + 5) obj += 350
    if (imc > req.user.userData.age - 5) obj -= 250
    if (req.user.userData.sex == "masculino") obj += 250
    if (req.user.userData.lifestyle == "ativo") obj += 350
    if (req.user.userData.lifestyle == "sedentario") obj -= 250
    if (req.user.userData.clima == "quente") obj += 250
    if (req.user.userData.clima == "humido") obj += 250
    const resposta = obj + normal
    res.status(200).json(resposta)
    return resposta
})

app.post("/logout",Authorize, async (req, res) => {
    const logout = await handleSessions(req.user.email)
    res.sendStatus(200)
    return logout
})

app.post("/api/post", (req, res) => {

})

app.get("/api/allmydata", (req, res) => {

})

app.delete("/api/delete", (req, res) => {

})





async function Authorize(req, res, next) {
    const checkToken = await findSessionByToken(req.headers.authorization)
    if (!checkToken) {
        res.status(403).json({ message: "Não existe nenhuma sessão com este token."})
        return
    }
    req.user = await findDocumentById(checkToken._id)
    next()
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

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