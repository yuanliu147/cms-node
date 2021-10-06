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

const { emitEvent, flatMenuToTree } = require('./utils')
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
      const userId = ctx.userId
      if (!deleteOperators[page]) {
        throw new Error('页面不存在~')
      }
      if (page === 'user' && id === userId) {
        throw new Error('抱歉，不能删除自己！')
        return
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
      const query = ctx.query
      const userId = ctx.userId
      const list = await listOperators[page](query, userId)
      const totalRes = await totalOperators[page]()
      if (page === 'user') {
        totalRes.total--
      }
      if (page === 'role') {
        list.forEach((item) => {
          item.permission = flatMenuToTree(item.permission)
        })
      }
      ctx.body = new SuccessModel({ list, ...totalRes })
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
