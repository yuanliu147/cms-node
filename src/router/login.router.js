const Router = require('koa-router')

const { login, verifyLogin } = require('../controller/login.controller')

const loginRouter = new Router()

loginRouter.post('/login', verifyLogin, login)

module.exports = loginRouter
