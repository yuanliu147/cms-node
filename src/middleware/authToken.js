const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/env.config')
const { FailModel } = require('../model/response.model')
const { TOKEN_IS_INVALID } = require('../constants/error-types')
const { emitEvent } = require('../utils/utils')

async function authToken(ctx, next) {
  if (ctx.path === '/login') {
    await next()
    return
  }
  const headers = ctx.request.headers
  const authorization = headers['authorization']
  if (!authorization) {
    emitEvent(ctx, TOKEN_IS_INVALID)
    return
  }
  const token = headers['authorization'].replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, secret_key)
    ctx.userId = decoded._id
  } catch (err) {
    emitEvent(ctx, TOKEN_IS_INVALID)
    return
  }
  await next()
}

module.exports = authToken
