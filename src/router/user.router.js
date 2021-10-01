const Router = require('koa-router')
const userRouter = new Router({ prefix: '/users' })
const idToNumber = require('../middleware/idToNumber')
const { getUsers, createUser, deleteUser, updateUser, getUserInfo } = require('../controller/user.controller')
const { verifyUser, verifyUserId } = require('../middleware/user.middleware')
const { createToVerifyOperator } = require('../utils/createMiddleware')

userRouter.get('/', createToVerifyOperator('search', 'user'), getUsers)
userRouter.post('/', createToVerifyOperator('create', 'user'), verifyUser, createUser)
userRouter.patch('/:id', idToNumber, createToVerifyOperator('update', 'user'), verifyUserId, verifyUser, updateUser)
userRouter.delete('/:id', idToNumber, createToVerifyOperator('delete', 'user'), verifyUserId, deleteUser)
userRouter.get('/:id', idToNumber, getUserInfo)

module.exports = userRouter
