const connection = require('../config/db.config')
const { HTTP_PARAMS_IS_ERROR } = require('../constants/error-types')
const { md5Password } = require('../utils/utils')
// #出现循环引用。 需要将其细分模块即可解决
const { createGetTotal, createGetAll, createDelete } = require('../utils/createService')

const currPage = 'user'

async function getUsersFromDB(pageSize = 10, pageNum = 1, userId) {
  const offset = (pageNum - 1) * pageSize
  const sql = `
    SELECT _id, name, email, cellPhone, job, state, createTime, updateTime 
    FROM users WHERE _id != ? LIMIT ${pageSize} OFFSET ${offset}
  `
  const result = await connection.execute(sql, [userId])
  return result[0]
}

const getAllUsers = createGetAll(currPage, connection)

const getUsersTotal = createGetTotal(currPage, connection)

const deleteUserById = createDelete(currPage, connection)

async function createNewUser({ name, password, email, cellPhone, sex, state, roleId, deptId }) {
  const sql = `
    INSERT INTO users(name, password, email, cellPhone, sex,  job, state, role_id, dept_id )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `
  // 此处password必须是string,不然会报错
  const result = await connection.execute(sql, [
    name,
    md5Password(password),
    email,
    cellPhone,
    sex,
    job,
    state,
    roleId,
    deptId
  ])
  return result[0]
}

async function updateUserById(_id, { name, email, cellPhone, sex, state, roleId, deptId }) {
  const sql = `
    UPDATE users SET 
    name = ?, email = ?, cellPhone = ?, sex = ?, state = ?, role_id = ?, dept_id = ?
    WHERE _id = ?
  `

  const result = await connection.execute(sql, [name, email, cellPhone, sex, state, roleId, deptId, _id])
  return result[0]
}

async function setAvatarById(_id, avatar) {
  const sql = `
    UPDATE users SET avatar = ? WHERE _id = ?
  `
  const result = await connection.execute(sql, [avatar, _id])

  return result[0]
}
async function getUserInfoById(_id) {
  const sql = `
    SELECT _id, name, email, cellPhone, sex, state, avatar, role_id roleId, dept_id deptId
    FROM users WHERE _id = ?
  `
  const result = await connection.execute(sql, [_id])
  return result[0]
}

module.exports = {
  getUsersFromDB,
  getUsersTotal,
  getAllUsers,
  createNewUser,
  deleteUserById,
  updateUserById,
  setAvatarById,
  getUserInfoById
}
