const jwt = require("jsonwebtoken");
const { privateKey, publicKey } = require("../app/config");
const { USERNAME_LOGIN } = require("../constants/user.constants");

const createToken = (id, username) => {
  var token = jwt.sign({ id, username }, privateKey, {
    expiresIn: "24h",
    algorithm: "RS256",
  });

  return token;
};

const verifyToken = (ctx) => {
  // 获取请求携带过来的token
  const authorization = ctx.headers.authorization;
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
      token,
    };
  } catch (error) {
    ctx.app.emit("error", new Error(USERNAME_LOGIN), ctx);
  }
};

module.exports = {
  createToken,
  verifyToken,
};
