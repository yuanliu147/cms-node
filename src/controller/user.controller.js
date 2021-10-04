const {
  createDeleteController,
  createUpdateController,
  createCreateController,
  createGetController
} = require('../utils/createController')

const { getUserInfoById } = require('../service/user.service')
const { SuccessModel, FailModel } = require('../model/response.model')

const currPage = 'user'

const getUsers = createGetController(currPage)

const createUser = createCreateController(currPage)

const updateUser = createUpdateController(currPage)

const deleteUser = createDeleteController(currPage)

const getUserInfo = async (ctx, next) => {
  const { id } = ctx.params
  const info = await getUserInfoById(id)
  if (info.length) {
    ctx.body = new SuccessModel(info[0])
  } else {
    ctx.body = new FailModel('获取信息失败~')
  }
}

const searchUsers = async (ctx, next) => {
  ctx.body = new SuccessModel('搜索成功')
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserInfo,
  searchUsers
}
