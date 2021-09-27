const { HTTP_PARAMS_IS_ERROR } = require('../constants/error-types')
const { emitEvent } = require('../utils/utils')

async function idToNumber(ctx, next) {
  try {
    if (ctx.params.id) {
      ctx.params.id *= 1
    }
  } catch (error) {
    emitEvent(ctx, HTTP_PARAMS_IS_ERROR)
    return
  }

  await next()
}

module.exports = idToNumber
