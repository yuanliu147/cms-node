const Router = require('koa-router')
const deptRouter = new Router({ prefix: '/dept' })
const idToNumber = require('../middleware/idToNumber')
const { getDepts, createDept, updateDept, deleteDept } = require('../controller/dept.controller')
const { verifyDept, verifyDeptId } = require('../middleware/dept.middleware')
const { createToVerifyOperator } = require('../utils/createMiddleware')

deptRouter.get('/', createToVerifyOperator('search', 'dept'), getDepts)
deptRouter.post('/', createToVerifyOperator('create', 'dept'), verifyDept, createDept)
deptRouter.patch('/:id', idToNumber, createToVerifyOperator('update', 'dept'), verifyDeptId, verifyDept, updateDept)
deptRouter.delete('/:id', idToNumber, createToVerifyOperator('delete', 'dept'), verifyDeptId, deleteDept)

module.exports = deptRouter
