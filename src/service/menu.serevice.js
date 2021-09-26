const connection = require('../config/db.config')
async function getMenusById(_id) {
  const sql = `
    SELECT menus._id _id, menus.name name, icon, path, type, menus.createTime createTime, menus.updateTime updateTime, menuLevel, parent_id, permission FROM menus 
    JOIN role_menus rm ON menus._id = rm.menu_id
    JOIN users ON rm.role_id = users.role_id
    WHERE users._id = ?
  `
  const result = await connection.execute(sql, [_id])

  return result[0]
}

module.exports = {
  getMenusById
}
