const connection = require('../config/db.config')
const { createGetAll, createDelete } = require('../utils/createService')

const currPage = 'menu'

async function getMenusById(_id) {
  const sql = `
    SELECT menus._id _id, menus.name name, icon, path, type, menus.createTime createTime, menus.updateTime updateTime, parent_id parentId, permission FROM menus 
    JOIN role_menus rm ON menus._id = rm.menu_id
    JOIN users ON rm.role_id = users.role_id
    WHERE users._id = ?
  `
  const result = await connection.execute(sql, [_id])

  return result[0]
}

const getAllMenus = createGetAll(currPage, connection)

async function createNewMenu({ name, icon = null, path, type = null, parentId = null, permission = null }) {
  // name不能为空， path在type不为3的时候不能为空
  const sql = `
    INSERT INTO menus (name, icon, path, type, parent_id, permission) VALUES (?, ?, ?, ?, ?, ?);
  `
  const result = await connection.execute(sql, [name, icon, path, type, parentId, permission])
  const insertId = result[0].insertId
  const sql2 = `
    INSERT INTO role_menus(role_id, menu_id) VALUES(1001, ?)
  `
  const result2 = await connection.execute(sql2, [insertId])
  return result[0]
}

async function updateMenuById(_id, { name, icon = null, path, parentId = null, permission = null }) {
  const sql = `
    UPDATE menus SET name=?, icon=?, path=?, parent_id=?, permission=? WHERE _id = ?
  `
  const result = await connection.execute(sql, [name, icon, path, parentId, permission, _id])

  return result[0]
}

const deleteMenuById = createDelete(currPage, connection)

module.exports = {
  getMenusById,
  getAllMenus,
  createNewMenu,
  updateMenuById,
  deleteMenuById
}
