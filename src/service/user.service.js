const connection = require('../config/db.config')
const { HTTP_PARAMS_IS_ERROR } = require('../constants/error-types')
const { md5Password } = require('../utils')

async function getUsersFromDB(pageSize = 10, pageNum = 1) {
  const offset = (pageNum - 1) * pageSize
  const sql = `
    SELECT _id, name, email, cellPhone, job, state, createTime, updateTime 
    FROM users LIMIT ${pageSize} OFFSET ${offset}
  `
  const result = await connection.execute(sql)
  return result[0]
}

async function getUsersTotal() {
  const sql = `
    SELECT COUNT(*) total FROM users
  `
  const dbRes = await connection.execute(sql) // 此时获取的是数据库查询结构，有用的是第一项
  const result = dbRes[0] // 此时获取的是查询结果的结构 为一个数组
  return result[0]
}

async function addNewUser(ctx, userInfo) {
  const sql = `
    INSERT INTO users(name, password, email, cellPhone, sex,  job, state, role_id, dept_id )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `
  const { name, password, email, cellPhone, sex, job, state, roleId, deptId } = userInfo

  const infoArr = [name, md5Password(password), email, cellPhone, sex, job, state, roleId, deptId]
  // 此处password必须是string,不然会报错

  if (infoArr.includes(undefined)) {
    throw new Error(HTTP_PARAMS_IS_ERROR)
  }

  const result = await connection.execute(sql, infoArr)
  return result[0]
}

async function deleteUserById(_id) {
  const sql = `
    DELETE FROM users WHERE _id = ?
  `
  const result = await connection.execute(sql, [_id])
  return result[0]
}

async function updateUserById(_id, userInfo) {
  const sql = `
    UPDATE users SET 
    name = ?, email = ?, cellPhone = ?, sex = ?,  job = ?, state = ?, role_id = ?, dept_id = ?
    WHERE _id = ${_id}
  `
  const { name, email, cellPhone, sex, job, state, roleId, deptId } = userInfo

  const infoArr = [name, email, cellPhone, sex, job, state, roleId, deptId]

  if (infoArr.includes(undefined)) {
    throw new Error(HTTP_PARAMS_IS_ERROR)
  }

  const result = await connection.execute(sql, infoArr)
  return result[0]
}

module.exports = {
  getUsersFromDB,
  getUsersTotal,
  addNewUser,
  deleteUserById,
  updateUserById
}
