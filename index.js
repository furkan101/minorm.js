const MySQL = require('mysql')
let isDbSetup = false, con, logCount = 0

module.exports = function() {

    this.connectDatabase = (params) => {
        con = MySQL.createConnection({
            host: params.host,
            user: params.user,
            password: params.password,
            database: params.database
        }), isDbSetup = true

        con.connect((err) => {
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> Connected to database successfully.`)
        })
    }
    
    this.createTable = (name, data) => {

        if (!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."
        if (typeof data !== 'object') throw "Second parameter must be an object."

        var keys = Object.keys(data), values = Object.values(data), query = `CREATE TABLE IF NOT EXISTS ${name} (`

        for(let i = 0; i < keys.length; i++) {
            if(values[i].startsWith("ai")) query += `${keys[i]} INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(${keys[i]}),`
            else if(values[i].startsWith("int")) query += `${keys[i]} INT(${values[i].replace("int - ", "")}),`
            else if(values[i].startsWith("char")) query += `${keys[i]} VARCHAR(${values[i].replace("char - ", "")}),`
            else if(values[i].startsWith("float")) query += `${keys[i]} FLOAT(${values[i].replace("float - ", "")}),`
            else if(values[i].startsWith("text")) query += `${keys[i]} TEXT(${values[i].replace("text - ", "")}),`
        }

        query = `${query.slice(0, -1)})`
        con.query(query, (err, result) => { 
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> query '${query}' has been executed.`)
        })
    
    }

    this.destroyTable = (name) => {

        if (!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."

        let query = `DROP TABLE ${name};`

        con.query(query, (err, result) => { 
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> query '${query}' has been executed.`)
        })

    }

    this.insertData = (table, data) => {

        if (!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."
        if (typeof data !== 'object') throw "Second parameter must be an object."

        var keys = Object.keys(data), values = Object.values(data), query = `INSERT INTO ${table} (`

        for(let i = 0; i < keys.length; i++) {
            query += `${keys[i]},`
        }

        query = `${query.slice(0, -1)}) VALUES(`

        for(let j = 0; j < values.length; j++) {
            if(typeof values[j] == 'string') query += `"${values[j]}",`
            else query += `${values[j]},`
        }

        query = `${query.slice(0, -1)})`
        
        con.query(query, (err, result) => {
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> query '${query}' has been executed.`)          
        })
    }

    this.destroyData = (table, data) => {

        if (!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."
        if (typeof data !== 'object') throw "Second parameter must be an object."
        if (typeof data.where !== 'object') throw 'Type of where must be an object.'
        
        let keys = Object.keys(data.where), values = Object.values(data.where), query = `DELETE FROM ${table} WHERE`

        if(keys.length == 1) {
            if(typeof values[0] == 'string') query += ` ${keys[0]} = "${values[0]}"`
            else query += ` ${keys[0]} = ${values[0]}`
        } 
        else if(keys.length > 1) {
            for(let i = 0; i < keys.length; i++) {
                if(typeof values[i] == 'string') query += ` ${keys[i]} = "${values[i]}" AND`
                else query += ` ${keys[i]} = ${values[i]} AND`
            }
            query = query.slice(0, -3)
        }

        con.query(query, (err, result) => {
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> query '${query}' has been executed.`)            
        })
    }

    this.updateData = (table, data) => {

        if (!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."
        if (typeof data !== 'object') throw "Second parameter must be an object."
        if (!('where' in data)) throw 'JSON object must contain "where" property.'
        if (!('newData' in data)) throw 'JSON object must contain "newData property."'
        if (typeof data.where !== 'object') throw 'Type of where must be an object.'
        if (typeof data.newData !== 'object') throw 'Type of newData must be an object.'

        let keys = [Object.keys(data.newData), Object.keys(data.where)], values = [Object.values(data.newData), Object.values(data.where)], query = `UPDATE ${table} SET `, i = 0

        keys[0].forEach(key => {
            if(typeof values[0][i] == 'string') query += `${key} = "${values[0][i]}",`
            else query += `${key} = ${values[0][i]},`
            i++
        })

        query = query.slice(0, -1) + ' WHERE '
        i = 0

        keys[1].forEach(key => {
            if(typeof values[1][i] == 'string') query += `${key} = "${values[1][i]}",`
            else query += `${key} = ${values[1][i]},`
            i++
        })

        query = query.slice(0, -1)
        con.query(query, (err, result) => {
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> query '${query}' has been executed.`)
        })
    }

    this.searchData = (table, data, callback) => {
  
        if (!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."
        if (typeof data !== 'object') throw "Second parameter must be an object." 
        if (typeof callback !== 'function') throw "Third parameter must be a function."
        if (!('where' in data)) throw 'JSON object must contain "where" property.'

        let keys = Object.keys(data.where), values = Object.values(data.where), query = `SELECT * FROM ${table} WHERE `, i = 0

        keys.forEach(key => {
            if(typeof values[i] == 'string') query += `${key} = "${values[i]}" AND `
            else query += `${key} = ${values[i]} AND `
            i++
        })

        query = query.slice(0, -4)
        console.log(query)
        con.query(query, (err, result) => {
            if (err) throw err
            logCount++
            console.log(`[MINORM LOG: #${logCount}] >> query '${query}' has been executed.`)
            callback(result)
        })
    }

}