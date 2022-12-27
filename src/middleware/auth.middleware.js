const { verifyToken } = require("../utils/token");
const { verifyCommonStatus } = require("../utils/verifyStatus");
const { FUNCTION_NOT } = require("../constants/user.constants");

const {
  USERNAME_LOGIN,
  VERIFYAUTH_NOT,
} = require("../constants/user.constants");

const authServise = require("../service/auth.servise");
const verifyAuth = async (ctx, next) => {
  // 验证该功能是否关闭_所有
  let isStatus = await verifyCommonStatus("loginStatus_all_admin");
  if (!isStatus && result.id != 1) {
    return ctx.app.emit("error", new Error(FUNCTION_NOT), ctx);
  }

  // 验证token
  const result = verifyToken(ctx);

  if (!result) {
    ctx.app.emit("error", new Error(USERNAME_LOGIN), ctx);
    return;
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
