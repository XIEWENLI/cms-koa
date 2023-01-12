const { writeAllStatus } = require("../hooks/writeAllStatus");
const commonService = require("../service/common.service.js");
const { getSumServise } = require("../utils/getSum.js");

class CommonController {
  // 修改common的所有状态其中之一
  updateAllStatus(ctx, next) {
    writeAllStatus(ctx.request.query.fieldName, ctx.request.query.status);

    ctx.body = {
      status: 1,
      message: "所有状态其中之一修改成功~",
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

  // 获取各个表数据的总数量
  async getSum(ctx, next) {
    const res = await getSumServise(
      ctx.request.query.tableName,
      ctx.request.query.type,
      ctx.request.query.web,
      ctx.user.id
    );
    ctx.body = {
      status: 1,
      message: res,
    };
  }
}

module.exports = new CommonController();
