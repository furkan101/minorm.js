
# minorm.js

minorm.js is a simple library to use JSON queries for MySQL database, kind of a little ORM named from mini-orm, written in Node.js.

# Installation

To install minorm.js, use following command on your terminal:

```
npm install minorm.js --save
```

To use minorm.js in your project, add following line:

```javascript
const MinormJS = require('minorm.js')
const minorm = new MinormJS()
```

# Example
```javascript
const MinormJS = require('minorm.js')
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

minorm.searchData('users', {
    "where": {
        "name": "Enes",
        "surname": "Katsaf"
    }    
}, (result) => {
    console.log(result)
})

minorm.updateData('users', {
    "newData": {
        "name": "Furkan",
        "age": 19
    },
    "where": {
        "name": "Enes"
    }
})


minorm.destroyData('users', {
    "where": {
        "surname": "Katsaf"
    }
})

minorm.destroyTable('users')

```
