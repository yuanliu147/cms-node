const { SuccessModel, FailModel } = require('../model/response.model')
const { emitEvent } = require('../utils/utils')
const path = require('path')
const { setAvatarById } = require('../service/user.service')
async function saveAvatar(ctx) {
  const { avatar } = ctx.request.files
  if (!avatar) {
    return emitEvent(ctx, '数据为空')
  }
  const avatarName = path.basename(avatar.path)
  const avatarUrl = `${ctx.origin}/uploads/${avatarName}`
  const userId = ctx.userId
  const res = await setAvatarById(userId, avatarUrl)
  if (res.affectedRows) {
    ctx.body = new SuccessModel('上传成功~')
  } else {
    ctx.body = new FailModel('上传失败~', res)
  }
}

module.exports = {
  saveAvatar
}
