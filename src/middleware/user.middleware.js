const {
  USERNAME_REPEAT,
  USERNAME_PASSWORD_NOT_NULL,
  USERNAME_NULL,
  PASSWORD_ERROR,
  FUNCTION_NOT,
  FUNCTION_NOT_ONE,
} = require("../constants/user.constants");
const userService = require("../service/user.service.js");
const toMD5 = require("../utils/MD5");
const {
  verifyCommonStatus,
  verifyUserStatus,
} = require("../utils/verifyStatus");

// 1、注册-账号合法性
const verifyRegister = async (ctx, next) => {
  // 验证该功能是否关闭
  let isStatus = await verifyCommonStatus("registerStatus_all_admin");
  if (!isStatus) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT), ctx);
  }

  const { username, password } = ctx.request.body;
  // 用户名或密码不能为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(USERNAME_PASSWORD_NOT_NULL), ctx);
  }

  // // 用户名是否存在
  const result = await userService.getUser("username", username);
  if (result.length) {
    return ctx.app.emit("error", new Error(USERNAME_REPEAT), ctx);
  }

  await next();
};

const verifyRegister2 = async (ctx, next) => {
  // 验证该功能是否关闭
  let isStatus = await verifyCommonStatus("registerStatus_all_user");
  if (!isStatus) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT), ctx);
  }

  const { username, password } = ctx.request.body;
  // 用户名或密码不能为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(USERNAME_PASSWORD_NOT_NULL), ctx);
  }

  // 用户名是否存在
  const result = await userService.getUser("username", username);
  if (result.length) {
    return ctx.app.emit("error", new Error(USERNAME_REPEAT), ctx);
  }

  await next();
};

//密码MD5加密(双层)
const passwordMD5 = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = toMD5(toMD5(password));

  await next();
};

const passwordMD52 = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = toMD5(toMD5(password));

  await next();
};

// 2、登录-密码正确性
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 用户名或密码不能为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(USERNAME_PASSWORD_NOT_NULL), ctx);
  }

  // 根据用户名获取用户信息
  const result = await userService.getUser("username", username);

  // 验证该功能是否关闭_所有
  let isStatus = await verifyCommonStatus("loginStatus_all_admin");

  if (!isStatus && result[0]?.id != 1) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT), ctx);
  }
  //用户名不存在
  if (result.length <= 0) {
    return ctx.app.emit("error", new Error(USERNAME_NULL), ctx);
  }
  // 密码错误
  if (result[0].password !== toMD5(toMD5(password))) {
    return ctx.app.emit("error", new Error(PASSWORD_ERROR), ctx);
  }

  // 验证该功能是否关闭_单个
  const isStatus2 = await verifyUserStatus(result[0].id);
  if (!isStatus2 && result[0].id != 1) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT_ONE), ctx);
  }

  ctx.user = {
    id: result[0].id,
    username: result[0].username,
    role_id: result[0].role_id,
  };

  await next();
};

const verifyLogin2 = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 用户名或密码不能为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(USERNAME_PASSWORD_NOT_NULL), ctx);
  }

  // 根据用户名获取用户信息
  const result = await userService.getUser("username", username);

  // 验证该功能是否关闭_所有
  let isStatus = await verifyCommonStatus("loginStatus_all_user");
  if (!isStatus && result[0]?.id != 1) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT), ctx);
  }

  //用户名不存在
  if (result.length <= 0) {
    return ctx.app.emit("error", new Error(USERNAME_NULL), ctx);
  }

  // 密码错误
  if (result[0].password !== toMD5(toMD5(password))) {
    return ctx.app.emit("error", new Error(PASSWORD_ERROR), ctx);
  }

  // 验证该功能是否关闭_单个
  const isStatus2 = await verifyUserStatus(result[0].id);
  if (!isStatus2 && result[0].id != 1) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT_ONE), ctx);
  }

  ctx.user = {
    id: result[0].id,
    username: result[0].username,
    role_id: result[0].role_id,
  };

  await next();
};

module.exports = {
  verifyRegister,
  verifyRegister2,
  passwordMD5,
  passwordMD52,
  verifyLogin,
  verifyLogin2,
};
