const Router = require("koa-router");

const { success } = require("../controller/auth.controller");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const authRouter = new Router({ prefix: "/auth" });

// 认证token
authRouter.get("/verifyToken", verifyAuth, verifyPower, success);

module.exports = authRouter;
