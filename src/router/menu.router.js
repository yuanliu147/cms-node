const Router = require('koa-router')
const menuRouter = new Router({ prefix: '/menus' })
const { getMenus } = require('../controller/menu.controller')
const { authUser } = require('../middleware/auth.middleware')
const { createMiddlewareToVerifyOperator } = require('../utils')
menuRouter.get('/', authUser, createMiddlewareToVerifyOperator('show', 'menu'), getMenus)

module.exports = menuRouter
