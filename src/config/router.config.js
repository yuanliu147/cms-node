const fs = require('fs')
const path = require('path')

function registerRouters(app) {
  const dirPath = path.resolve(__dirname, '../router')
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const router = require(`${dirPath}/${file}`)
    app.use(router.routes()).use(router.allowedMethods())
  })
}

module.exports = {
  registerRouters
}
