const Router = require('koa-router')
const roleRouter = new Router({ prefix: '/roles' })
const idToNumber = require('../middleware/idToNumber')
const { getRoles, createRole, updateRole, deleteRole } = require('../controller/role.controller')
const { verifyRole, verifyRoleId } = require('../middleware/role.middleware')
const { createToVerifyOperator } = require('../utils/createMiddleware')

roleRouter.get('/', getRoles)
roleRouter.post('/', createToVerifyOperator('create', 'role'), verifyRole, createRole)
roleRouter.patch('/:id', idToNumber, createToVerifyOperator('update', 'role'), verifyRoleId, verifyRole, updateRole)
roleRouter.delete('/:id', idToNumber, createToVerifyOperator('delete', 'role'), verifyRoleId, deleteRole)

module.exports = roleRouter
