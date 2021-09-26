const crypto = require('crypto')
const { getMenusById } = require('../service/menu.serevice')
const md5Password = (password) => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

function emitEvent(ctx, msg) {
  const error = new Error(msg)
  ctx.app.emit('error', error, ctx)
}

function createMiddlewareToVerifyOperator(permission, page) {
  return async function (ctx, next) {
    const id = ctx.userId || null
    const menus = await getMenusById(id)
    const hasAuthority = menus.find((item) => {
      return item.permission === `${permission}:${page}`
    })
    if (!hasAuthority) {
      emitEvent(ctx, 'NO PERMISSION')
      return
    }

    await next()
  }
}

module.exports = {
  emitEvent,
  md5Password,
  createMiddlewareToVerifyOperator
}
