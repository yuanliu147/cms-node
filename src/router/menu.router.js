const Router = require('koa-router')
const menuRouter = new Router({ prefix: '/menus' })
const { getMenus } = require('../controller/menu.controller')
const { createToVerifyOperator } = require('../utils/createMiddleware')
menuRouter.get('/', createToVerifyOperator('show', 'menu'), getMenus)

module.exports = menuRouter
