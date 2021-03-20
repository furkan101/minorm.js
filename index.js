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
            console.log(`[GLORM LOG: #${logCount}] >> Connected to database successfully.`)
        })
    }
    
    this.createTable = (name, data) => {

        if(!isDbSetup) throw "Database settings are not set up. Please use connectDatabase function."

        var keys = Object.keys(data), values = Object.values(data), sql = `CREATE TABLE IF NOT EXISTS ${name} (`, query = ""

        for(let i = 0; i < keys.length; i++) {
            if(values[i].startsWith("ai")) sql += `${keys[i]} INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(${keys[i]}),`
            else if(values[i].startsWith("int")) sql += `${keys[i]} INT(${values[i].replace("int - ", "")}),`
            else if(values[i].startsWith("char")) sql += `${keys[i]} VARCHAR(${values[i].replace("char - ", "")}),`
            else if(values[i].startsWith("float")) sql += `${keys[i]} FLOAT(${values[i].replace("float - ", "")}),`
            else if(values[i].startsWith("text")) sql += `${keys[i]} TEXT(${values[i].replace("text - ", "")}),`
        }

        query = `${sql.slice(0, -1)})`
        con.query(query, (err, result) => { 
            if (err) throw err
            logCount++
            console.log(`[GLORM LOG: #${logCount}] >> query '${query}' has been executed.`)
        })
    
    }

}