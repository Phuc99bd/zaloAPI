'use strict'

class ConvertEmptyStringsToNull {
  async handle ({ request }, next) {
    if (Object.keys(request.body).length) {
      request.body = Object.assign(
        ...Object.keys(request.body).map(key => ({
          [key]: request.body[key] !== '' ? request.body[key] : null
        }))
      )
    }
    request.header("Access-Control-Allow-Origin", "*");
    request.header("Access-Control-Allow-Methods", 'GET, PUT, PATCH, POST, DELETE');
    request.header("Access-Control-Allow-Headers", "Content-Type");
    await next()
  }
}

module.exports = ConvertEmptyStringsToNull
