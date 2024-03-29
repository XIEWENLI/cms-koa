const {
  USERNAME_REPEAT,
  USERNAME_USERNAMEandPASSWORD_NOT_NULL,
  USERNAME_NULL,
  PASSWORD_ERROR,
  USERNAME_LOGIN,
  RESOURCE_NOT_EXIST,
  VERIFYAUTH_NOT,
  ROLENAME_EXIST,
  PARAM_NOT_NULL,
  FUNCTION_NOT,
  FUNCTION_NOT_ONE,
} = require("../constants/user.constants");

function errFn(errorMessage, ctx) {
  let status, message;
  switch (errorMessage.message) {
    case USERNAME_REPEAT:
      status = 0;
      message = "用户名已经存在~";
      break;
    case USERNAME_USERNAMEandPASSWORD_NOT_NULL:
      status = 0;
      message = "用户名或者密码不能为空~";
      break;
    case USERNAME_NULL:
      status = 0;
      message = "用户名不存在~";
      break;
    case PASSWORD_ERROR:
      status = 0;
      message = "密码是错误的~";
      break;
    case USERNAME_LOGIN:
      status = 0;
      message = "请先登录~";
      break;
    case RESOURCE_NOT_EXIST:
      status = 0;
      message = "请求资源不存在~";
      break;
    case VERIFYAUTH_NOT:
      status = 0;
      message = "您没有该权限~";
      break;
    case ROLENAME_EXIST:
      status = 0;
      message = "角色名已存在~";
      break;
    case PARAM_NOT_NULL:
      status = 0;
      message = "参数不能为空~";
      break;
    case FUNCTION_NOT:
      status = 0;
      message = "该功能已关闭，暂时无法访问~";
      break;
    case FUNCTION_NOT_ONE:
      status = 0;
      message = "您账户该功能已被禁止，暂时无法访问~";
      break;
    default:
      status = 0;
      message = "资源不存在~";
  }

  ctx.body = {
    status,
    message,
  };
}

module.exports = errFn;
