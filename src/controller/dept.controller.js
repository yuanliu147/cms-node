const { SuccessModel, FailModel } = require('../model/response.model')
const {
  getDeptsFromDB,
  getDeptsTotal,
  createNewDept,
  updateDeptById,
  deleteDeptById
} = require('../service/dept.service')
const { emitEvent } = require('../utils/utils')
const { createDeleteController, createUpdateController, createCreateController, createGetController } = require('../utils/createController')

const currPage = 'dept'

// async function getDepts(ctx) {
//   try {
//     let { pageSize, pageNum } = ctx.query
//     pageSize *= 1
//     pageNum *= 1
//     const depts = await getDeptsFromDB(pageSize, pageNum)
//     const total = await getDeptsTotal()
//     ctx.body = new SuccessModel({ depts, ...total })
//   } catch (error) {
//     emitEvent(ctx, error.message)
//   }
// }
const getDepts = createGetController(currPage)

const createDept = createCreateController(currPage)

const updateDept = createUpdateController(currPage)

const deleteDept = createDeleteController(currPage)

module.exports = {
  getDepts,
  createDept,
  updateDept,
  deleteDept
}
