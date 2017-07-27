const ExtendableError =  require('es6-error');

class BadRequestError extends ExtendableError {
  constructor(msg = 'Bad Request') {
    super(msg);
    this.status = 400;
  }
}

class NotFoundError extends ExtendableError {
  constructor(msg = 'Not Found') {
    super(msg);
    this.status = 404;
  }
}

exports.BadRequestError = BadRequestError;
exports.NotFoundError = NotFoundError;
