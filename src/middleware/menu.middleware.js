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
  if (index >= 0 && httpPath === '/menus') {
    emitEvent(ctx, 'name或path已经存在')
    return
  } else if(index < 0 && httpPath !== '/menus'){
    emitEvent(ctx, 'name或path不存在')
    return
  }

  await next()
}

const verifyMenuId = createToVerifyId(getAllMenus)

const verifyDelete = async (ctx, next) => {
  const { id } = ctx.params
  if(id <= 11021 && id >= 11001) {
    emitEvent(ctx, '抱歉，预置菜单不能删除~')
    return
  }
  await next()
}

module.exports = {
  verifyMenuId,
  verifyMenu,
  verifyDelete
}
