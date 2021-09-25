const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/env.config')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR
} = require('../constants/error-types')
const { getUserByName } = require('../service/login.service')
const { md5Password } = require('../utils/encryptPass')
const { SuccessModel } = require('../model/response.model')


async function verifyLogin (ctx, next) {
  const { userName, userPwd } = ctx.request.body
  // 验证账号或密码是否为空
  if (!userName || !userPwd) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    ctx.app.emit('error', error, ctx)
    return
  }
  // 验证账号是否存在
  const res = await getUserByName(userName)
  if(!res.length) {
    const error = new Error(USER_IS_NOT_EXISTS)
    ctx.app.emit('error', error, ctx)
    return
  }
  // 验证密码已否正确
  const user = res[0]
  if(md5Password(userPwd) !== user.userPwd) {
    const error = new Error(PASSWORD_IS_ERROR)
    ctx.app.emit('error', error, ctx)
    return
  }
  ctx.user = user // !有个问题？这里赋值之后是不是所有的中间件都能访问这个值
  await next()
}

function login (ctx) {
  const { _id, userName } = ctx.user
  const token = jwt.sign({ _id, userName }, secret_key, {
    expiresIn: 60 * 60 * 12
  })
  ctx.body = new SuccessModel({
    _id,
    userName,
    token
  })
}

module.exports = {
  login,
  verifyLogin
}