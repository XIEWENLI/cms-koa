const { verifyToken } = require("../utils/token");

const verifyAuth = async (ctx, next) => {
  // 验证token
  const result = verifyToken(ctx);
  if (typeof result !== "object") return;
  await next();
};

module.exports = {
  verifyAuth,
};
