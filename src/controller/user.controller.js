const userServise = require("../service/user.service");
const { createToken } = require("../utils/token");

class UserController {
  async register(ctx, next) {
    await userServise.create(ctx.request.body);
    ctx.body = {
      code: 200,
      message: "注册成功~",
    };
  }

  async login(ctx, next) {
    const { id, username } = ctx.user;
    // 创建token
    const token = createToken(id, username);
    ctx.body = { id, username, token };
  }
}

module.exports = new UserController();
