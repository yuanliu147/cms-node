const Router = require('koa-router')
const deptRouter = new Router({ prefix: '/dept' })
const { authUser } = require('../middleware/auth.middleware')
const { getDepts, createDept, updateDept, deleteDept } = require('../controller/department.controller')
const { createMiddlewareToVerifyOperator } = require('../utils')

deptRouter.get('/', authUser, createMiddlewareToVerifyOperator('show', 'department'), getDepts)
deptRouter.post('/', authUser, createMiddlewareToVerifyOperator('create', 'department'), createDept)
deptRouter.patch('/:id', authUser, createMiddlewareToVerifyOperator('update', 'department'), updateDept)
deptRouter.delete('/:id', authUser, createMiddlewareToVerifyOperator('delete', 'department'), deleteDept)

module.exports = deptRouter
