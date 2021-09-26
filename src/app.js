const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const { app_port } = require('./config/env.config')
const { registerRouters } = require('./config/router.config')
const { errorToCode } = require('./constants/error-types')
const { FailModel } = require('./model/response.model')
app.use(bodyParser())

registerRouters(app)

app.listen(app_port, () => {
  console.log(`端口: ${app_port}. 服务已启动~`)
})

app.on('error', (err, ctx) => {
  const msg = err.message
  ctx.body = new FailModel(msg)
})
