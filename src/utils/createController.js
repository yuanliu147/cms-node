const {
  deleteDeptById,
  updateDeptById,
  createNewDept,
  getDeptsFromDB,
  getDeptsTotal
} = require('../service/dept.service')
const {
  deleteUserById,
  updateUserById,
  createNewUser,
  getUsersFromDB,
  getUsersTotal
} = require('../service/user.service')

const { createNewMenu, updateMenuById, deleteMenuById } = require('../service/menu.serevice')
const {
  getRolesFromDB,
  getRolesTotal,
  createNewRole,
  updateRoleById,
  deleteRoleById
} = require('../service/role.service')

const { emitEvent } = require('./utils')
const { SuccessModel, FailModel } = require('../model/response.model')

const deleteOperators = {
  dept: deleteDeptById,
  user: deleteUserById,
  menu: deleteMenuById,
  role: deleteRoleById
}
const updateOperators = {
  dept: updateDeptById,
  user: updateUserById,
  menu: updateMenuById,
  role: updateRoleById
}
const createOperators = {
  dept: createNewDept,
  user: createNewUser,
  menu: createNewMenu,
  role: createNewRole
}
const listOperators = {
  dept: getDeptsFromDB,
  user: getUsersFromDB,
  role: getRolesFromDB
}
const totalOperators = {
  dept: getDeptsTotal,
  user: getUsersTotal,
  role: getRolesTotal
}

function createDeleteController(page) {
  return async function (ctx) {
    try {
      const { id } = ctx.params

      if (!deleteOperators[page]) {
        throw new Error('页面不存在~')
      }
      const res = await deleteOperators[page](id)

      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel('删除成功')
      }
    } catch (error) {
      emitEvent(ctx, error.message)
    }
  }
}

function createUpdateController(page) {
  return async function (ctx) {
    try {
      const { id } = ctx.params
      const deptInfo = ctx.request.body

      if (!updateOperators[page]) {
        throw new Error('页面不存在~')
      }
      const res = await updateOperators[page](id, deptInfo)
      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel('更新成功~')
      }
    } catch (error) {
      emitEvent(ctx, error.message)
    }
  }
}

function createCreateController(page) {
  return async function (ctx) {
    try {
      const info = ctx.request.body

      const res = await createOperators[page](info)
      if (res.affectedRows > 0) {
        ctx.body = new SuccessModel('创建成功~')
      } else if (res.affectedRows === 0) {
        ctx.body = new FailModel('创建失败~', res)
      }
    } catch (error) {
      emitEvent(ctx, error.message)
    }
  }
}

function createGetController(page) {
  return async function (ctx) {
    try {
      let { pageSize = 10, pageNum = 1 } = ctx.query
      pageSize *= 1
      pageNum *= 1
      const list = await listOperators[page](pageSize, pageNum)
      const total = await totalOperators[page]()
      ctx.body = new SuccessModel({ list, ...total })
    } catch (error) {
      emitEvent(ctx, error.message)
    }
  }
}

module.exports = {
  createDeleteController,
  createUpdateController,
  createCreateController,
  createGetController
}
