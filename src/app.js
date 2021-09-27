const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const { app_port } = require('./config/env.config')
const { registerRouters } = require('./config/router.config')
const authToken = require('./middleware/authToken')
const { FailModel } = require('./model/response.model')

const app = new Koa()

app.use(bodyParser())
app.use(authToken)


registerRouters(app)

app.listen(app_port, () => {
  console.log(`端口: ${app_port}. 服务已启动~`)
})

app.on('error', (err, ctx) => {
  const msg = err.message
  ctx.body = new FailModel(msg)
})
