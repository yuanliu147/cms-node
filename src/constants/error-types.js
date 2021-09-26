const USER_OR_PASSWORD_IS_ERROR = 'user_or_password_is_error'
const TOKEN_IS_INVALID = 'token_is_invalid'
const HTTP_PARAMS_IS_ERROR = 'http_params_is_error'

const errorToCode = {
  [USER_OR_PASSWORD_IS_ERROR]: 400,
  [TOKEN_IS_INVALID]: 401,
  [HTTP_PARAMS_IS_ERROR]: 400
}

module.exports = {
  errorToCode,
  USER_OR_PASSWORD_IS_ERROR,
  TOKEN_IS_INVALID,
  HTTP_PARAMS_IS_ERROR
}
