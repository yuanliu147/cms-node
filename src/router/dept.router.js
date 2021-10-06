const Router = require('koa-router')
const deptRouter = new Router({ prefix: '/depts' })
const idToNumber = require('../middleware/idToNumber')
const { getDepts, createDept, updateDept, deleteDept } = require('../controller/dept.controller')
const { verifyDept, verifyDeptId, verifyDelete } = require('../middleware/dept.middleware')
const { createToVerifyOperator } = require('../utils/createMiddleware')

deptRouter.get('/', getDepts)
deptRouter.post('/', createToVerifyOperator('create', 'dept'), verifyDept, createDept)
deptRouter.patch('/:id', idToNumber, createToVerifyOperator('update', 'dept'), verifyDeptId, verifyDept, updateDept)
deptRouter.delete('/:id', idToNumber, createToVerifyOperator('delete', 'dept'), verifyDeptId, verifyDelete, deleteDept)

module.exports = deptRouter
