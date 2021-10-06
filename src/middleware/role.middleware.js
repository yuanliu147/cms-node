const { getAllRoles } = require('../service/role.service')
const { createToVerifyId } = require('../utils/createMiddleware')
const { emitEvent } = require('../utils/utils')

async function verifyRole(ctx, next) {
  const { id } = ctx.params
  const { name, desc, menuIds } = ctx.request.body
  if (!name) {
    emitEvent(ctx, '角色名称不能为空~')
    return
  }
  if (!menuIds || !menuIds.length) {
    return emitEvent(ctx, '请设置权限~')
  }
  if (desc === '') {
    ctx.request.body.desc = null
  }
  const roles = await getAllRoles()
  const index = roles.findIndex((item) => item.name === name && item._id !== id)
  if (index >= 0) {
    emitEvent(ctx, '角色名称已经存在~')
    return
  }
  await next()
}

const verifyRoleId = createToVerifyId(getAllRoles)

const verifyDelete = async (ctx, next) => {
  const { id } = ctx.params
  if(id <= 1003 && id >= 1001) {
    emitEvent(ctx, '抱歉，预置角色不能删除~')
    return
  }
  await next()
}

module.exports = {
  verifyRole,
  verifyRoleId,
  verifyDelete
}
