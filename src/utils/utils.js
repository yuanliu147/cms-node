const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

function emitEvent(ctx, msg) {
  const error = new Error(msg)
  ctx.app.emit('error', error, ctx)
}

module.exports = {
  emitEvent,
  md5Password
}
