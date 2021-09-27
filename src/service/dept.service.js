const connection = require('../config/db.config')
const { HTTP_PARAMS_IS_ERROR } = require('../constants/error-types')
const { createGetTotal, createGetAll, createDelete } = require('../utils/createService')

const currPage = 'dept'

async function getDeptsFromDB(pageSize = 10, pageNum = 1) {
  const offset = (pageNum - 1) * pageSize
  const sql = `
    SELECT * FROM depts LIMIT ${pageSize} OFFSET ${offset}
  `
  const result = await connection.execute(sql)
  return result[0]
}

const getAllDepts = createGetAll(currPage, connection)

const getDeptsTotal = createGetTotal(currPage, connection)

async function createNewDept({name, leader}) {
  const sql = `
    INSERT INTO depts (name, leader) VALUES (?, ?)
  `
  const result = await connection.execute(sql, [name, leader])
  return result[0]
}

async function updateDeptById(_id, {name, leader}) {
  const sql = `
    UPDATE depts SET name=?, leader=? WHERE _id = ?
  `
  const result = await connection.execute(sql, [name, leader, _id])
  return result[0]
}

const deleteDeptById = createDelete(currPage, connection)

module.exports = {
  getDeptsFromDB,
  getAllDepts,
  getDeptsTotal,
  createNewDept,
  updateDeptById,
  deleteDeptById
}
