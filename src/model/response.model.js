const { errorToCode } = require('../constants/error-types')

class BaseModel {
  constructor(data, msg) {
    if(typeof data === 'string') {
      this.msg = data
      this.data = ''
    } else {
      this.data = data
      this.msg = msg
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data = {}, msg = '') {
    super(data, msg)
    this.code = 200
  }
}

class FailModel extends BaseModel {
  constructor(msg = '', data) {
    super(data, msg)
    this.code = errorToCode[msg] ?? 404
  }
}

module.exports = {
  SuccessModel,
  FailModel
}