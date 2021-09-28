const { TARGET_IS_NOT_EXISTS, TARGET_ALREADY_EXISTS } = require('../constants/error-types')
const { getAllUsers } = require('../service/user.service')
const { getAllDepts } = require('../service/dept.service')
const { emitEvent } = require('../utils/utils')
const { createToVerifyId } = require('../utils/createMiddleware')

const verifyDept = async (ctx, next) => {
  const { id } = ctx.params
  const { leader, name } = ctx.request.body

  if (leader === undefined || name === undefined) {
    emitEvent(ctx, '部门数据字段不能为undefined~')
    return
  }

  const users = await getAllUsers()
  const leaderExists = users.find((item) => item.name === leader)
  if (!leaderExists) {
    emitEvent(ctx, TARGET_IS_NOT_EXISTS)
    return
  }
  const depts = await getAllDepts()
  const nameExists = depts.find((item) => item._id !== id && item.name === name)
  if (nameExists) {
    emitEvent(ctx, TARGET_ALREADY_EXISTS)
    return
  }

  await next()
}

const verifyDeptId = createToVerifyId(getAllDepts)

module.exports = {
  verifyDept,
  verifyDeptId
}
