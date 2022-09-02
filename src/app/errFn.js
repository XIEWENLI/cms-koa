const { USER_NAME } = require("../constants/user.constants");

function errFn(errorMessage, ctx) {
  switch (errorMessage.message) {
    case USER_NAME:
      ctx.body = USER_NAME;
      ctx.status = 400;
      break;
    default:
      ctx.body = "资源不存在";
      ctx.status = 404;
  }
}

module.exports = errFn;
