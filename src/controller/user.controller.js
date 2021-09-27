const {
  getUsersFromDB,
  getUsersTotal,
  createNewUser,
  deleteUserById,
  updateUserById
} = require('../service/user.service')
const { SuccessModel, FailModel } = require('../model/response.model')
const { emitEvent } = require('../utils/utils')
const { createDeleteController, createUpdateController, createCreateController, createGetController } = require('../utils/createController')

const currPage = 'user'

// async function getUsers(ctx) {
//   try {
//     let { pageSize, pageNum } = ctx.query
//     pageSize *= 1
//     pageNum *= 1
//     const users = await getUsersFromDB(pageSize, pageNum)
//     const total = await getUsersTotal()
//     ctx.body = new SuccessModel({ users, ...total })
//   } catch (err) {
//     emitEvent(ctx, err.message)
//   }
// }
const getUsers = createGetController(currPage)

const createUser = createCreateController(currPage)

const updateUser = createUpdateController(currPage)

const deleteUser = createDeleteController(currPage)

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser
}
