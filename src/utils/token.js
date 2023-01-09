const jwt = require("jsonwebtoken");
const { privateKey, publicKey } = require("../app/config");
const { USERNAME_LOGIN } = require("../constants/user.constants");

// 生成token
const createToken = (id, username, role_id) => {
  var token = jwt.sign({ id, username, role_id }, privateKey, {
    expiresIn: "24h",
    algorithm: "RS256",
  });

  return token;
};

// 验证token
const verifyToken = (ctx) => {
  // 获取请求携带过来的token
  let authorization = ctx.headers.authorization
    ? ctx.headers.authorization
    : ctx.request.query.token;

  if (!authorization) {
    return ctx.app.emit("error", new Error(USERNAME_LOGIN), ctx);
  }

  const token = authorization.replace("Bearer ", "");
  // 验证token
  try {
    const result = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    ctx.user = {
      id: result.id,
      username: result.username,
      role_id: result.role_id,
    };

    return result;
  } catch (err) {
    ctx.app.emit("error", new Error(USERNAME_LOGIN), ctx);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
