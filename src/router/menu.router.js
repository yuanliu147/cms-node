const Router = require('koa-router')
const menuRouter = new Router({ prefix: '/menus' })
const { getMenus, createNewMenu, updateMenu, deleteMenu } = require('../controller/menu.controller')
const { createToVerifyOperator } = require('../utils/createMiddleware')
const { verifyMenuId, verifyMenu, verifyDelete } = require('../middleware/menu.middleware')
const idToNumber = require('../middleware/idToNumber')

menuRouter.get('/', getMenus)
menuRouter.post('/', createToVerifyOperator('create', 'menu'), verifyMenu, createNewMenu)
menuRouter.patch('/:id', idToNumber, createToVerifyOperator('update', 'menu'), verifyMenuId, verifyMenu, updateMenu)
menuRouter.delete('/:id', idToNumber, createToVerifyOperator('update', 'menu'), verifyMenuId, verifyDelete, deleteMenu)

module.exports = menuRouter
