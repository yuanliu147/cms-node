const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/env.config')
const { HTTP_PARAMS_IS_ERROR, USER_OR_PASSWORD_IS_ERROR } = require('../constants/error-types')
const { getUserByName } = require('../service/login.service')
const { SuccessModel } = require('../model/response.model')
const { emitEvent, md5Password } = require('../utils')

async function verifyLogin(ctx, next) {
  const { name, password } = ctx.request.body
  // 验证账号或密码是否为空
  if (!name || !password) {
    emitEvent(ctx, HTTP_PARAMS_IS_ERROR)
    return
  }
  // 验证账号是否存在
  const res = await getUserByName(name)
  if (!res.length) {
    emitEvent(ctx, USER_OR_PASSWORD_IS_ERROR)
    return
  }
  // 验证密码已否正确
  const user = res[0]
  if (md5Password(password) !== user.password) {
    emitEvent(ctx, USER_OR_PASSWORD_IS_ERROR)
    return
  }
  ctx.user = user
  await next()
}

function login(ctx) {
  const { _id, name } = ctx.user
  const token = jwt.sign({ _id, name }, secret_key, {
    expiresIn: 60 * 60 * 12
  })
  ctx.body = new SuccessModel({
    _id,
    name,
    token
  })
}

module.exports = {
  login,
  verifyLogin
}
