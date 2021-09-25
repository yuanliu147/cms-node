const connection = require('../config/db.config')

async function getUserByName(userName) {
  const sql = `
    SELECT * FROM users WHERE userName = ?
  `
  const result = await connection.execute(sql, [userName])
  return result[0]
}

module.exports = {
  getUserByName
}