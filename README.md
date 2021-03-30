
# minorm.js

minorm.js is a simple library to use JSON queries for MySQL database, kind of a little ORM named from mini-orm, written in Node.js.

# Contributing
All you have to do is forking repository, coding stuff, committing and creating pull request. I suggest using GitHub Desktop.

# Installation

To install vun.js, use following command on your terminal:

```
npm install vun.js --save
```

To use vun.js in your project, add following line:

```javascript
const MinormJS = require('minorm.js')
const minorm = new MinormJS()
```

# Function List

# Example
```javascript
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
```
