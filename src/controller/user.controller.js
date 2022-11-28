const userServise = require("../service/user.service");
const { createToken } = require("../utils/token");

class UserController {
  async register(ctx, next) {
    await userServise.create(ctx.request.body);
    ctx.body = {
      status: 1,
      message: "注册成功~",
    };
  }

  async login(ctx, next) {
    const { id, username, role_id } = ctx.user;

    // 创建token
    const token = createToken(id, username, role_id);
    // 菜单menu
    const menu = await userServise.getMenu(role_id);

    ctx.body = { status: 1, id, username, role_id, token, menu };
  }
}

module.exports = new UserController();
