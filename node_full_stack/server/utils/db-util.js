const cfg = require('../../config.js')
const mysql = require('mysql')

const db = cfg.database

const pool = mysql.createPool({
    host: db.host,
    user: db.username,
    database: db.database,
    password: db.password
})

const query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

const add = function (sql, arr) {
    return query(sql, arr)
}

module.exports = {
    query,
    add
}