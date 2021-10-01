const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/env.config')
const { HTTP_PARAMS_IS_ERROR, USER_OR_PASSWORD_IS_ERROR } = require('../constants/error-types')
const { getUserByName } = require('../service/login.service')
const { SuccessModel } = require('../model/response.model')
const { emitEvent, md5Password } = require('../utils/utils')

async function verifyLogin(ctx, next) {
  const { name, password } = ctx.request.body
  // 验证账号或密码是否为空
  if (!name || !password) {
    emitEvent(ctx, '账号或密码错误~')
    return
  }
  // 验证账号是否存在
  const res = await getUserByName(name)
  if (!res.length) {
    emitEvent(ctx, '账号或密码错误~')
    return
  }
  // 验证密码已否正确
  const user = res[0]
  if (md5Password(password) !== user.password) {
    emitEvent(ctx, '账号或密码错误~')
    return
  }
  ctx.user = user
  await next()
}

function login(ctx) {
  const { _id, name, email, cellPhone, sex, state, avatar, role_id, dept_id } = ctx.user
  const token = jwt.sign({ _id, name, avatar }, secret_key, {
    expiresIn: 60 * 60 * 12
  })
  ctx.body = new SuccessModel(
    { userInfo: { _id, name, email, cellPhone, sex, state, avatar, roleId: role_id, deptId: dept_id }, token },
    '登录成功~'
  )
}

module.exports = {
  login,
  verifyLogin
}
