const { verifyToken } = require("../utils/token");
const { verifyCommonStatus } = require("../utils/verifyStatus");
const { FUNCTION_NOT } = require("../constants/user.constants");

const {
  USERNAME_LOGIN,
  VERIFYAUTH_NOT,
} = require("../constants/user.constants");

const authServise = require("../service/auth.servise");
const verifyAuth = async (ctx, next) => {
  // 验证token
  const result = verifyToken(ctx);

  if (!result?.id) {
    ctx.app.emit("error", new Error(USERNAME_LOGIN), ctx);
    return;
  }

  // 验证该功能是否关闭_所有
  let loginStatus = "loginStatus_all_admin";
  let isUser =
    ctx.request.query.isUser === undefined
      ? ctx.response.isUser
      : ctx.request.query.isUser;

  if (isUser !== undefined) {
    loginStatus = "loginStatus_all_user";
  }

  let isStatus = await verifyCommonStatus(loginStatus);
  if (!isStatus && result?.id != 1) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT), ctx);
  }

  await next();
};

// 权限验证
const verifyPower = async (ctx, next) => {
  let path = ctx.request.path;
  let userObj = ctx.user;

  const res = await authServise.power(path, userObj.role_id);

  if (res.length <= 0) {
    ctx.app.emit("error", new Error(VERIFYAUTH_NOT), ctx);
    return;
  }

  await next();
};

module.exports = {
  verifyAuth,
  verifyPower,
};
