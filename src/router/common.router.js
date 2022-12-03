const Router = require("koa-router");

const { updateAllStatus } = require("../controller/common.controller");

const commonRouter = new Router({ prefix: "/common" });

// 修改common的所有状态其中之一
commonRouter.get("/updateAllStatus", updateAllStatus);

module.exports = commonRouter;
