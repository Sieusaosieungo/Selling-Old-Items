const errorCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUREST: 429,
  INTERNAL_SERVER_ERROR: 500,
  EMAIL_ALREADY_EXIST: 1,
  FILE_TOO_LARGE: 2,
  CANT_CREATE_FILE: 3,
};

module.exports = errorCode;
