const userServise = require("../service/user.service");
const { USER_NAME } = require("../constants/user.constants");

class UserController {
  async create(ctx, next) {
    return ctx.app.emit("error", new Error(USER_NAME), ctx); //测试业务接口报错

    const result = await userServise.create(ctx.request.body);

    ctx.body = result;
  }
}

module.exports = new UserController();
