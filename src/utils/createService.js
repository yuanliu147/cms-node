function createGetTotal(page, connection) {
  return async function () {
    const sql = `
      SELECT COUNT(*) total FROM ${page}s
    `
    const dbRes = await connection.execute(sql) // 此时获取的是数据库查询结构，有用的是第一项
    const result = dbRes[0] // 此时获取的是查询结果的结构 为一个数组
    return result[0]
  }
}

function createGetAll(page, connection) {
  return async function () {
    const sql = `
      SELECT * FROM ${page}s
    `
    const result = await connection.execute(sql)
    return result[0]
  }
}

function createDelete(page, connection) {
  return async function (_id) {
    const sql = `
      DELETE FROM ${page}s WHERE _id = ?
    `
    const result = await connection.execute(sql, [_id])
    return result[0]
  }
}

module.exports = {
  createGetTotal,
  createGetAll,
  createDelete
}
