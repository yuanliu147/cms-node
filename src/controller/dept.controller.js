const {
  createDeleteController,
  createUpdateController,
  createCreateController,
  createGetController
} = require('../utils/createController')

const currPage = 'dept'

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
