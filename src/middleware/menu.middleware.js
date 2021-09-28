const { createToVerifyId } = require('../utils/createMiddleware')
const { getAllMenus } = require('../service/menu.serevice')
const { emitEvent } = require('../utils/utils')

const verifyMenu = async function (ctx, next) {
  const { name, icon, type, path, parentId, permission } = ctx.request.body
  const httpPath = ctx.path
  if (!name || (!type && httpPath === '/menus')) {
    emitEvent(ctx, 'name或type不能为空~')
    return
  }
  if (type !== 3 && !path) {
    emitEvent(ctx, 'path不能为空~')
    return
  }

  ;[name, icon, type, path, parentId, permission].forEach((item) => {
    if (item === '') {
      ctx.request.body[item] = null
    }
  })

  const menus = await getAllMenus()

  const index = menus.findIndex((item) => {
    return item.name === name || item.path === path
  })
  if (index >= 0) {
    emitEvent(ctx, 'name或path已经存在')
    return
  }

  await next()
}

const verifyMenuId = createToVerifyId(getAllMenus)

module.exports = {
  verifyMenuId,
  verifyMenu
}
