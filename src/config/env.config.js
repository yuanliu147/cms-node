const dotenv = require('dotenv')
dotenv.config()

module.exports = { app_port, sql_host, sql_user, sql_password, sql_database, secret_key } = process.env
