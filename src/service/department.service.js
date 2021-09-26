const connection = require('../config/db.config')
const { HTTP_PARAMS_IS_ERROR } = require('../constants/error-types')

async function getDeptsFromDB() {
  const sql = `
    SELECT _id, name,
    (SELECT name userName FROM users WHERE users._id = department.userId) leader, createTime, updateTime
    FROM department
  `
  const result = await connection.execute(sql)
  return result[0]
}

async function createNewDept(name, leader) {
  const sql = `
    INSERT INTO department (name, leader) VALUES (?, ?)
  `
  const result = await connection.execute(sql, [name, leader])
  return result[0]
}

async function updateDeptById(_id, deptInfo) {
  const sql = `
    UPDATE department SET name=?, leader=? WHERE _id = ${_id}
  `
  const { name, leader } = deptInfo
  const infoArr = [name, leader]

  if (infoArr.includes(undefined)) {
    throw new Error(HTTP_PARAMS_IS_ERROR)
  }
  const result = await connection.execute(sql, [name, leader])
  return result[0]
}

async function deleteDeptById(_id) {
  const sql = `
    DELETE FROM department WHERE _id = ?
  `
  const result = await connection.execute(sql, [_id])
  return result[0]
}

module.exports = {
  getDeptsFromDB,
  createNewDept,
  updateDeptById,
  deleteDeptById
}
