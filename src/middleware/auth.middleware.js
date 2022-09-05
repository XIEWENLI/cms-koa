const { verifyToken } = require("../utils/token");

const verifyAuth = async (ctx, next) => {
  // 验证token
  verifyToken(ctx);
  await next();
};

module.exports = {
  verifyAuth,
};
