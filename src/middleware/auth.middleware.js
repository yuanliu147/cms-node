const jwt = require('jsonwebtoken')
const { secret_key } = require('../config/env.config')
const { FailModel } = require('../model/response.model')
const { TOKEN_IS_INVALID } = require('../constants/error-types')

function authUser(ctx, next) {
  const headers = ctx.request.headers
  const token = headers['authorization'].replace('Bearer ', '')
  try {
    jwt.verify(token, secret_key)
  } catch () {
    const error = new Error(TOKEN_IS_INVALID)
    ctx.app.emit('error', error, ctx)
    return
  }
  await next()
}

module.exports = {
  authUser
}