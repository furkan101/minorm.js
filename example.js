require('dotenv').config()

const MinormJS = require('./index')
const minorm = new MinormJS()

minorm.connectDatabase({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})


minorm.searchData('users', {
    "where": {
        "name": "Enes",
        "surname": "Katsaf"
    }    
}, (result) => {
    console.log(result)
})

/*minorm.createTable('users', {
    id: "ai",
    name: "char - 24",
    surname: "char - 24",
    age: "int - 11",
    biography: "text - 1024",
    rotation: "float - 3"
})



minorm.updateData('users', {
    "newData": {
        "name": "Furkan",
        "age": 19
    },
    "where": {
        "name": "Enes"
    }
})*/

/*
minorm.destroyData('users', {
    where: {
        "surname": "Katsaf"
    }
})

minorm.destroyTable('users')
*/