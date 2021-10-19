const Router = require('koa-router')
const viewRouter = new Router({ prefix: '/overview' })
const { getDeptView, getRoleView } = require('../controller/overview.controller')

viewRouter.get('/deptnum', getDeptView)
viewRouter.get('/rolenum', getRoleView)
module.exports = viewRouter
