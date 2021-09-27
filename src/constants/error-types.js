const USER_OR_PASSWORD_IS_ERROR = 'user_or_password_is_error'
const TOKEN_IS_INVALID = 'token_is_invalid'
const HTTP_PARAMS_IS_ERROR = 'http_params_is_error'
const NO_PERMISSION = 'no_permission'
const TARGET_IS_NOT_EXISTS = 'target_is_not_exists'
const TARGET_ALREADY_EXISTS = 'target_already_exists'

const errorToCode = {
  [USER_OR_PASSWORD_IS_ERROR]: 400,
  [TOKEN_IS_INVALID]: 401,
  [HTTP_PARAMS_IS_ERROR]: 400,
  [TARGET_IS_NOT_EXISTS]: 400,
  [TARGET_ALREADY_EXISTS]: 400,
  [NO_PERMISSION]: 403
}

module.exports = {
  errorToCode,
  USER_OR_PASSWORD_IS_ERROR,
  TOKEN_IS_INVALID,
  HTTP_PARAMS_IS_ERROR,
  TARGET_IS_NOT_EXISTS,
  TARGET_ALREADY_EXISTS,
  NO_PERMISSION
}
