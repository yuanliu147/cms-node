const { getMenusById } = require('../service/menu.serevice')
const { emitEvent } = require('./utils')
const { TARGET_IS_NOT_EXISTS, NO_PERMISSION } = require('../constants/error-types')

function createToVerifyOperator(permission, page) {
  return async function (ctx, next) {
    const id = ctx.userId || null
    const menus = await getMenusById(id)
    const hasAuthority = menus.find((item) => {
      return item.permission === `${permission}:${page}`
    })
    if (!hasAuthority) {
      emitEvent(ctx, NO_PERMISSION)
      return
    }
    await next()
  }
}

function createToVerifyId(service) {
  return async function verifyId(ctx, next) {
    let { id } = ctx.params
    const list = await service()
    const isExists = list.find((item) => {
      return item._id === id
    })
    if (!isExists) {
      emitEvent(ctx, '部门id不存在~')
      return
    }
    await next()
  }
}

module.exports = {
  createToVerifyOperator,
  createToVerifyId
}
