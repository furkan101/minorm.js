require('dotenv').config()

const MinormJS = require('./index')
const minorm = new MinormJS()

minorm.connectDatabase({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

minorm.createTable('users', {
    id: "ai",
    name: "char - 24",
    surname: "char - 24",
    age: "int - 11",
    biography: "text - 1024",
    rotation: "float - 3"
})

minorm.insertData('users', {
    "name": "Enes",
    "surname": "Katsaf",
    "age": 18,
    "biography": "I was born in Antalya",
    "rotation": 5
})

minorm.destroyData('users', {
    where: {
        "surname": "Katsaf"
    }
})

glorm.destroyTable('users')