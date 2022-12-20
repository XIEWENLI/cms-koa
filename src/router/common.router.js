const Router = require("koa-router");

const {
  updateAllStatus,
  getStatus,
} = require("../controller/common.controller");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const commonRouter = new Router({ prefix: "/common" });

// 修改common的所有状态其中之一
commonRouter.get("/updateAllStatus", verifyAuth, verifyPower, updateAllStatus);

// 获取common表数据
commonRouter.get("/getStatus", verifyAuth, verifyPower, getStatus);

module.exports = commonRouter;
