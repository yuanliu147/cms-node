const { flatMenuToTree } = require('../utils/utils')
const { getMenusById } = require('../service/menu.serevice')
const { SuccessModel } = require('../model/response.model')
const { createCreateController, createUpdateController, createDeleteController } = require('../utils/createController')

const currPage = 'menu'

async function getMenus(ctx) {
  const _id = ctx.userId
  const menus = await getMenusById(_id)
  ctx.body = new SuccessModel(flatMenuToTree(menus))
}

const createNewMenu = createCreateController(currPage)

const updateMenu = createUpdateController(currPage)

const deleteMenu = createDeleteController(currPage)

module.exports = {
  getMenus,
  createNewMenu,
  updateMenu,
  deleteMenu
}
