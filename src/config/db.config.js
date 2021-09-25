const mysql = require('mysql2/promise')

const {
  sql_host,
  sql_user,
  sql_password,
  sql_database
} = require('./env.config')

const pool = mysql.createPool({
  host: sql_host,
  user: sql_user,
  password: sql_password,
  database: sql_database
})

pool.on('connection', () => {
  console.log('数据连接成功')
})

module.exports = pool