const connection = require('../config/db.config')
const { createGetList, createGetTotal, createGetAll, createDelete } = require('../utils/createService')

const currPage = 'role'

const getRolesFromDB = createGetList(currPage, connection)
const getRolesTotal = createGetTotal(currPage, connection)
const getAllRoles = createGetAll(currPage, connection)
const deleteRoleById = createDelete(currPage, connection)
async function createNewRole({ name, desc = null, menuIds }) {
  const sql = 'INSERT INTO roles(`name`, `desc`) VALUES(?, ?)'

  const result = await connection.execute(sql, [name, desc])
  const insertId = result[0].insertId
  const sql2 = `
    INSERT INTO role_menus(role_id, menu_id) VALUES(?, ?)
  `

  for (const item of menuIds) {
    await connection.execute(sql2, [insertId, item])
  }

  return result[0]
}
async function updateRoleById(_id, { name, desc = null, menuIds }) {
  const sql = 'UPDATE roles SET name=?, `desc`=? WHERE _id = ?'
  const result = await connection.execute(sql, [name, desc, _id])
  const sql2 = `
    DELETE FROM role_menus WHERE role_id = ?
  `
  const result2 = await connection.execute(sql2, [_id])
  const sql3 = `
    INSERT INTO role_menus(role_id, menu_id) VALUES(?, ?)
  `
  for (const item of menuIds) {
    await connection.execute(sql3, [_id, item])
  }
  return result[0]
}

module.exports = {
  getRolesFromDB,
  getRolesTotal,
  getAllRoles,
  createNewRole,
  updateRoleById,
  deleteRoleById
}
