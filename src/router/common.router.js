const Router = require("koa-router");

const {
  updateAllStatus,
  getStatus,
  getSum,
} = require("../controller/common.controller");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const commonRouter = new Router({ prefix: "/common" });

// 修改common的所有状态其中之一
commonRouter.get("/updateStatus", verifyAuth, verifyPower, updateAllStatus);

// 获取common表数据之一
commonRouter.get("/getStatus", verifyAuth, verifyPower, getStatus);

// 获取各个表数据的总数量
commonRouter.get("/getSum", verifyAuth, verifyPower, getSum);

module.exports = commonRouter;
