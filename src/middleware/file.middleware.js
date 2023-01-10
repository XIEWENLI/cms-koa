const { verifyToken } = require("../utils/token");

const verifyAuth = async (ctx, next) => {
  // 验证token
  const result = verifyToken(ctx);
  if (typeof result !== "object") return;
  await next();
};

const obtain = async (ctx, next) => {
  ctx.download = 0;
  await next();
};

const download = async (ctx, next) => {
  ctx.download = 1;
  await next();
};

module.exports = {
  verifyAuth,
  obtain,
  download,
};
