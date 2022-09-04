const {
  USERNAME_REPEAT,
  USERNAME_PASSWORD_NULL,
  USERNAME_NULL,
  PASSWORD_ERROR,
} = require("../constants/user.constants");
const service = require("../service/user.service.js");
const toMD5 = require("../utils/MD5");

// 1、注册-账号合法性
const verifyRegister = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 用户名或密码不能为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(USERNAME_PASSWORD_NULL), ctx);
  }

  // // 用户名是否存在
  const result = await service.getUserByUserName(username);
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

// 2、登录-密码正确性
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 用户名或密码不能为空
  if (!username || !password) {
    return ctx.app.emit("error", new Error(USERNAME_PASSWORD_NULL), ctx);
  }

  const result = await service.getUserByUserName(username);
  //用户名不存在
  if (!result.length) {
    return ctx.app.emit("error", new Error(USERNAME_NULL), ctx);
  }
  // 密码错误
  if (result[0].password !== toMD5(toMD5(password))) {
    return ctx.app.emit("error", new Error(PASSWORD_ERROR), ctx);
  }

  ctx.user = {
    id: result[0].id,
    username: result[0].username,
  };

  await next();
};

module.exports = {
  verifyRegister,
  passwordMD5,
  verifyLogin,
};
