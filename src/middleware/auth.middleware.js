const { verifyToken } = require("../utils/token");

const {
  USERNAME_LOGIN,
  VERIFYAUTH_NOT,
} = require("../constants/user.constants");

const authServise = require("../service/auth.servise");
const verifyAuth = async (ctx, next) => {
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

  if (userObj.role_id !== 1) {
    const res = await authServise.power(path, userObj.role_id);

    if (res.length <= 0) {
      ctx.app.emit("error", new Error(VERIFYAUTH_NOT), ctx);
      return;
    }
  }

  await next();
};

module.exports = {
  verifyAuth,
  verifyPower,
};
