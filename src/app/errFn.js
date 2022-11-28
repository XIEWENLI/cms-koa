const {
  USERNAME_REPEAT,
  USERNAME_USERNAMEandPASSWORD_NOT_NULL,
  USERNAME_NULL,
  PASSWORD_ERROR,
  USERNAME_LOGIN,
} = require("../constants/user.constants");

function errFn(errorMessage, ctx) {
  let status, message;
  switch (errorMessage.message) {
    case USERNAME_REPEAT:
      status = 409;
      message = "用户名已经存在~";
      break;
    case USERNAME_USERNAMEandPASSWORD_NOT_NULL:
      status = 400;
      message = "用户名或者密码不能为空~";
      break;
    case USERNAME_NULL:
      status = 400;
      message = "用户名不存在~";
      break;
    case PASSWORD_ERROR:
      status = 400;
      message = "密码是错误的~";
      break;
    case USERNAME_LOGIN:
      status = 400;
      message = "请先登录~";
      break;
    default:
      status = 404;
      message = "资源不存在";
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = errFn;
