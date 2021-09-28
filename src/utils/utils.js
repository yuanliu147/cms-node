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

function flatMenuToTree(menus, _id = null) {
  const result = []
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].parentId === _id) {
      result.push(menus[i])
      menus.splice(i, 1)
      i--
    }
  }
  result.forEach((item) => {
    item.children = flatMenuToTree(menus, item._id)
  })
  return result
}

module.exports = {
  emitEvent,
  md5Password,
  flatMenuToTree
}
