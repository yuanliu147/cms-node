const NAME_OR_PASSWORD_IS_REQUIRED = 'name_or_password_id_required'
const USER_IS_NOT_EXISTS = 'user_is_not_exists'
const PASSWORD_IS_ERROR = 'password_is_error'
const TOKEN_IS_INVALID = 'token_is_invalid'

const errorToCode = {
  [NAME_OR_PASSWORD_IS_REQUIRED]: 400,
  [USER_IS_NOT_EXISTS]: 400,
  [PASSWORD_IS_ERROR]: 400,
  [TOKEN_IS_INVALID]: 401
}

module.exports = {
  errorToCode,
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_IS_NOT_EXISTS,
  PASSWORD_IS_ERROR,
  TOKEN_IS_INVALID
}