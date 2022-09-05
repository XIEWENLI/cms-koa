const Router = require("koa-router");

const { success } = require("../controller/auth.controller");
const { verifyAuth } = require("../middleware/auth.middleware");

const authRouter = new Router({ prefix: "/auth" });

// 登录认证token
authRouter.get("/verifyToken", verifyAuth, success);

module.exports = authRouter;
