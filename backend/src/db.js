const { MongoClient, ObjectId } = require('mongodb')
const URL = process.env.MONGO_URL ?? "mongodb://localhost:27017"

let client
async function connectToMongo() {
    try {
        if (!client) {
            client = await MongoClient.connect(URL)
    }
    return client;
    } catch (err) {
        console.log(err)
    }
}

async function getMongoCollection(dbName, collectionName) {
    const client = await connectToMongo()
    return client.db(dbName).collection(collectionName)
}

async function createDocument(data) {
    const collection = await getMongoCollection("thirsty", "users")
    const result = await collection.insertOne(data)
    console.log(result)
    return result.insertedId
}

async function createSession(data) {
    const collection = await getMongoCollection("thirsty", "sessions")
    const result = await collection.insertOne(data)
    console.log(result)
    return result
}

async function getCollection() {
    const collection = await getMongoCollection("thirsty", "users")
    const result = await collection.find().toArray()
    console.log(result)
    return result
}

async function findDocumentById(id) {
    if(!ObjectId.isValid(id)) return null;
    const collection = await getMongoCollection("thirsty", "users")
    const doc = await collection.findOne({_id: {$eq:new ObjectId(id)}})
    return doc
}

async function findDocumentByEmail(email) {
    const collection = await getMongoCollection("thirsty", "users")
    const doc = await collection.findOne({email: {$eq:email}})
    return doc
}

async function findSessionByEmail(email) {
    const collection = await getMongoCollection("thirsty", "sessions")
    const doc = await collection.findOne({email: {$eq:email}})
    return doc
}

async function findSessionByToken(token) {
    const collection = await getMongoCollection("thirsty", "sessions")
    const doc = await collection.findOne({token: {$eq:token}})
    return doc
}

async function deleteSessionByEmail(email) {
    const collection = await getMongoCollection("thirsty", "sessions")
    const doc = await collection.deleteOne({email: {$eq:email}})
    return doc
}

async function deleteDocumentById(id) {
    const collection = await getMongoCollection("thirsty", "users")
    const doc = await collection.deleteOne({_id: {$eq:new ObjectId(id)}})
    return doc
}

async function updateDoc(elem, data) {
    const collection = await getMongoCollection("thirsty", "users")
    const result = await collection.updateOne(
        elem, {$set: data}
        )
    console.log(result)
    return result
}

module.exports = { connectToMongo, createDocument, createSession, getCollection, findDocumentById, findDocumentByEmail, findSessionByEmail, findSessionByToken, deleteSessionByEmail, deleteDocumentById, updateDoc }