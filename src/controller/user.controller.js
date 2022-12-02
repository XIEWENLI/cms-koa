const userServise = require("../service/user.service");
const { createToken } = require("../utils/token");

class UserController {
  // 注册
  async register(ctx, next) {
    await userServise.create(ctx.request.body);
    ctx.body = {
      status: 1,
      message: "注册成功~",
    };
  }

  // 登录
  async login(ctx, next) {
    const { id, username, role_id } = ctx.user;

    // 创建token
    const token = createToken(id, username, role_id);
    // 菜单menu
    const menu = await userServise.getMenu(role_id);

    ctx.body = { status: 1, id, username, role_id, token, menu };
  }

  // 修改单个用户 登录\禁止 状态
  async updateUserLoginStatus(ctx, next) {
    const res = await userServise.userLoginStatus(
      Number(ctx.request.query.user_id),
      Number(ctx.request.query.loginStatus)
    );

    ctx.body = {
      status: 1,
      message: "单个用户登录状态修改成功~",
    };
  }
}

module.exports = new UserController();
