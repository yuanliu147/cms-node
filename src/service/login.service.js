const connection = require('../config/db.config')

async function getUserByName(name) {
  const sql = `
    SELECT * FROM users WHERE name = ?
  `
  const result = await connection.execute(sql, [name])
  return result[0]
}

module.exports = {
  getUserByName
}
