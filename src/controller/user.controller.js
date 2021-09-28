const {
  createDeleteController,
  createUpdateController,
  createCreateController,
  createGetController
} = require('../utils/createController')

const currPage = 'user'

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
