const { verifyToken } = require("../utils/token");

const { USERNAME_LOGIN } = require("../constants/user.constants");

const verifyAuth = async (ctx, next) => {
  // 验证token
  const result = verifyToken(ctx);

  if (!result.id) {
    ctx.app.emit("error", new Error(USERNAME_LOGIN), ctx);
    return;
  }
  await next();
};

module.exports = {
  verifyAuth,
};
