const connection = require('../config/db.config')
async function getDeptViewFromDB() {
  const sql = `
    SELECT depts.name name, (SELECT COUNT(*) FROM users WHERE users.dept_id = depts._id) value FROM users
    RIGHT JOIN depts ON users.dept_id = depts._id
    GROUP BY depts._id
  `
  const result = await connection.execute(sql)
  return result[0]
}

async function getRoleViewFromDB() {
  const sql = `
    SELECT roles.name name, (SELECT COUNT(*) FROM users WHERE users.role_id = roles._id) value FROM users
    RIGHT JOIN roles ON users.role_id = roles._id
    GROUP BY roles._id
  `
  const result = await connection.execute(sql)
  return result[0]
}

module.exports = {
  getDeptViewFromDB,
  getRoleViewFromDB
}
