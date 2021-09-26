const { emitEvent } = require('../utils')
const { getMenusById } = require('../service/menu.serevice')
const { SuccessModel } = require('../model/response.model')
async function getMenus(ctx) {
  const _id = ctx.userId
  const menus = await getMenusById(_id)
  // !真正写这个接口的时候还需将扁平数组树状化
  ctx.body = new SuccessModel(menus)
}

module.exports = {
  getMenus
}
