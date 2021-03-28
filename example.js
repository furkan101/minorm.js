require('dotenv').config()

const GlormJS = require('./index')
const glorm = new GlormJS()

glorm.connectDatabase({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

glorm.createTable('users', {
    id: "ai",
    name: "char - 24",
    surname: "char - 24",
    age: "int - 11",
    biography: "text - 1024",
    rotation: "float - 3"
})

glorm.destroyTable('users')