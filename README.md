
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

# Function List
 - `connectDatabase(JSON properties)` Connects to your MySQL database with param given.
 - `createTable(string table, JSON structure)` Creates database file in directory with JSON file format.
 - `destroyTable(string table)` Deletes the table you entered in table param if it exists.
 - `insertData(string table, JSON data)` Inserts JSON object you entered in second param to database you entered in first param.
 - `destroyData(string table, JSON fromWhere)` Deletes data you gave in second param from table.
 - `updateData(string table, JSON newData, JSON fromWhere)` Change all data given in third param with second param.
 - `searchData(string table, JSON objectToSearch, function callback)` Searches object you gave in second param in database, returns all rows match as an array with callback.

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
    id: "ai", // Stands for AUTO INCREMENT
    name: "char - 24", // varchar type, length 24
    surname: "char - 24", // varchar type, length 24
    age: "int - 11", // integer type with length 11
    biography: "text - 1024", // text type, length 1024
    rotation: "float - 3" // float with length 3
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
