const { writeAllStatus } = require("../hooks/writeAllStatus");
const commonService = require("../service/common.service.js");

class CommonController {
  // 修改common的所有状态其中之一
  updateAllStatus(ctx, next) {
    writeAllStatus(ctx.request.query.fieldName, ctx.request.query.status);

    ctx.body = {
      status: 1,
      message: "用户状态其中之一修改成功~",
    };
  }

  // 获取common表数据
  async getStatus(ctx, next) {
    const res = await commonService.getCommonStatus(
      ctx.request.query.fieldName
    );
    ctx.body = {
      status: 1,
      message: res[0],
    };
  }
}

module.exports = new CommonController();
