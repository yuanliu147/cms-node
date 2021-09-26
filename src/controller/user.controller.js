const { getUsersFromDB, getUsersTotal, addNewUser, deleteUserById, updateUserById } = require('../service/user.service')
const { SuccessModel, FailModel } = require('../model/response.model')
const { emitEvent } = require('../utils')

async function getUserList(ctx) {
  const { pageSize, pageNum } = ctx.query
  try {
    const users = await getUsersFromDB(pageSize, pageNum)
    const total = await getUsersTotal()
    ctx.body = new SuccessModel({ users, ...total })
  } catch (er) {
    emitEvent(ctx, err.message)
  }
}

async function createUser(ctx) {
  // const { name, password, email, cellPhone, sex,  job, state, roleId } = ctx.request.body
  try {
    const userInfo = ctx.request.body
    // !此处应该检查 name, email, cellPhone等是否已经存在, 如果存在则报错
    const res = await addNewUser(ctx, userInfo)
    if (res.insertId) {
      ctx.body = new SuccessModel('创建成功')
    } else {
      ctx.body = res
    }
  } catch (err) {
    emitEvent(ctx, err.message)
  }
}

async function deleteUser(ctx) {
  // !大量重复代码
  try {
    const { id } = ctx.params
    // !需要判断id是否存在
    const res = await deleteUserById(id)
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

async function updateUser(ctx) {
  try {
    const { id } = ctx.params
    const userInfo = ctx.request.body
    // !id是否存在
    // ! userInfo里面的数据也该检查
    const res = await updateUserById(id, userInfo)
    if (res.affectedRows > 0) {
      ctx.body = new SuccessModel('更新成功')
    } else if (res.affectedRows === 0) {
      ctx.body = new FailModel('更新失败，目标可能不存在~')
    } else {
      ctx.body = res
    }
  } catch (error) {
    emitEvent(ctx, error.message)
  }
}

module.exports = {
  getUserList,
  createUser,
  deleteUser,
  updateUser
}
