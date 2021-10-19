const { SuccessModel } = require('../model/response.model')

const { getDeptViewFromDB, getRoleViewFromDB } = require('../service/view.service')

async function getDeptView(ctx, next) {
  const res = await getDeptViewFromDB()
  ctx.body = new SuccessModel(res)
}

async function getRoleView(ctx, next) {
  const res = await getRoleViewFromDB()
  ctx.body = new SuccessModel(res)
}

module.exports = {
  getDeptView,
  getRoleView
}
