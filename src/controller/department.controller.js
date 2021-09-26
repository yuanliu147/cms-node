const { SuccessModel, FailModel } = require('../model/response.model')
const { getDeptsFromDB, createNewDept, updateDeptById, deleteDeptById } = require('../service/department.service')
const { emitEvent } = require('../utils')

async function getDepts(ctx) {
  try {
    const res = await getDeptsFromDB()
    ctx.body = new SuccessModel(res)
  } catch (error) {
    emitEvent(ctx, error.message)
  }
}

async function createDept(ctx) {
  try {
    const { name, leader } = ctx.request.body
    // !注意，在创建时，得判断leader是否存在，不存在则报错
    // !注意，还得判断 部门名称是否已经存在，存在则报错
    const res = await createNewDept(name, leader)
    if (res.affectedRows > 0) {
      ctx.body = new SuccessModel('创建成功~')
    } else if (res.affectedRows === 0) {
      ctx.body = new FailModel('创建失败~', res)
    } else {
      ctx.body = res
    }
  } catch (error) {
    emitEvent(ctx, error.message)
  }
}

async function updateDept(ctx) {
  try {
    const { id } = ctx.params
    const deptInfo = ctx.request.body
    // !此处还得判断 id是否存在，不存在则报错，
    // ! leader, 以及 部门名称 是否已存在, 同createDept
    const res = await updateDeptById(id, deptInfo)
    if (res.affectedRows > 0) {
      ctx.body = new SuccessModel('更新成功~')
    } else if (res.affectedRows === 0) {
      ctx.body = new FailModel('更新失败~', res)
    } else {
      ctx.body = res
    }
  } catch (error) {
    emitEvent(ctx, error.message)
  }
}

async function deleteDept(ctx) {
  // !存在大量重复代码
  try {
    const { id } = ctx.params
    // !此处得判断 id 是否已经存在
    const res = await deleteDeptById(id)
    if (res.affectedRows > 0) {
      ctx.body = new SuccessModel('删除成功')
    } else if (res.affectedRows === 0) {
      ctx.body = new FailModel('目标已删除，请勿重新操作~')
    } else {
      ctx.body = res
    }
  } catch (error) {
    emitEvent(ctx, error.message)
  }
}

module.exports = {
  getDepts,
  createDept,
  updateDept,
  deleteDept
}
