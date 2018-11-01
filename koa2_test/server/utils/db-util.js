const cfg = require('../../config.js')
const mysql = require('mysql')

const db = cfg.database

const pool = mysql.createPool({
    host: db.host,
    user: db.user,
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

const select = function(table, keys) {
    const _sql = `select ?? from ?? `
    return query(_sql, [keys, table])
}

module.exports = {
    select
}