const { writeAllStatus } = require("../utils/writeAllStatus");

class CommonController {
  // 修改common的所有状态其中之一
  updateAllStatus(ctx, next) {
    writeAllStatus(ctx.request.query.fieldName, ctx.request.query.status);

    ctx.body = {
      status: 1,
      message: "用户状态其中之一修改成功~",
    };
  }
}

module.exports = new CommonController();
