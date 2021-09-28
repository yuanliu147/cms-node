const {
  createGetController,
  createCreateController,
  createUpdateController,
  createDeleteController
} = require('../utils/createController')

const currPage = 'role'

const getRoles = createGetController(currPage)
const createRole = createCreateController(currPage)
const updateRole = createUpdateController(currPage)
const deleteRole = createDeleteController(currPage)

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole
}
