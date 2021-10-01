const Router = require('koa-router')
const { saveAvatar } = require('../controller/file.controller')
const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', saveAvatar)

module.exports = fileRouter
