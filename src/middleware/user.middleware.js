const { TARGET_ALREADY_EXISTS } = require('../constants/error-types')
const { getAllUsers } = require('../service/user.service')
const { createToVerifyId } = require('../utils/createMiddleware')
const { emitEvent } = require('../utils/utils')

const verifyUser = async (ctx, next) => {
  let { id } = ctx.params
  const userInfo = ctx.request.body
  const infoArr = ['name', 'email', 'cellPhone', 'sex', 'state', 'roleId', 'deptId']
  for (let item of infoArr) {
    if (userInfo[item] === undefined) {
      emitEvent(ctx, '用户数据字段不能为undefined~')
      return
    }
  }

  const users = await getAllUsers()
  const isExists = users.find(
    // 寻找id与当前id不同的，且name, email, cellPhone任一相同的，即表示数据相同
    (item) =>
      item._id !== id &&
      (item.name === userInfo.name || item.email === userInfo.email || item.cellPhone === userInfo.cellPhone)
  )
  if (isExists) {
    emitEvent(ctx, "用户名, 邮箱或手机号已经存在~")
    return
  }

  await next()
}

const verifyUserId = createToVerifyId(getAllUsers)

const verifyDelete = async (ctx, next) => {
  const { id } = ctx.params
  if(id <= 106 && id >= 101) {
    emitEvent(ctx, '抱歉，预置用户不能删除~')
    return
  }
  await next()
}

module.exports = {
  verifyUser,
  verifyUserId,
  verifyDelete
}
