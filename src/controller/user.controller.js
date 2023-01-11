const userServise = require("../service/user.service");
const { createToken } = require("../utils/token");

const { writeNumberOfUsers } = require("../hooks/writeNumberOfUsers");

class UserController {
  // 注册
  async register(ctx, next) {
    await userServise.create(ctx.request.body);

    // comon表用户记录+1
    writeNumberOfUsers();

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

    // 获取菜单menu
    const menu = await userServise.getMenu(role_id);

    ctx.body = { status: 1, id, username, role_id, token, menu };
  }

  // 删除用户
  async delUser(ctx, next) {
    await userServise.delUserByUserId(ctx.request.query.user_id);
    ctx.body = { status: 1, message: "删除成功~" };
  }

  // 获取自定条件的所有用户
  async getUsers(ctx, next) {
    const usersInfo = await userServise.getUsersInfo(
      ctx.request.query.limit,
      ctx.request.query.offset,
      ctx.request.query.inputVal
    );

    ctx.body = {
      status: 1,
      message: usersInfo,
    };
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

  // 修改角色
  async updateRole(ctx, next) {
    await userServise.updateRole(
      ctx.request.query.user_id,
      ctx.request.query.role_id
    );
    ctx.body = {
      status: 1,
      message: "修改用户的角色成功~",
    };
  }

  // 根据用户id获取用户信息
  async getUserById(ctx, next) {
    const res = await userServise.getUserById(ctx.request.query.user_id);

    ctx.body = {
      status: 1,
      message: res,
    };
  }

  // 根据用户userName获取用户信息
  async getUserByuserName(ctx, next) {
    const res = await userServise.getUserByuserName(ctx.request.query.userName);
    ctx.body = {
      status: 1,
      message: res,
    };
  }
}

module.exports = new UserController();
