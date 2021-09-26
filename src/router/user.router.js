const Router = require('koa-router')
const userRouter = new Router({ prefix: '/users' })

const { authUser } = require('../middleware/auth.middleware')
const { getUserList, createUser, deleteUser, updateUser } = require('../controller/user.controller')
const { createMiddlewareToVerifyOperator } = require('../utils')

userRouter.get('/', authUser, createMiddlewareToVerifyOperator('show', 'user'), getUserList)
userRouter.post('/', authUser, createMiddlewareToVerifyOperator('create', 'user'), createUser)
userRouter.delete('/:id', authUser, createMiddlewareToVerifyOperator('delete', 'user'), deleteUser)
userRouter.patch('/:id', authUser, createMiddlewareToVerifyOperator('update', 'user'), updateUser)
module.exports = userRouter
