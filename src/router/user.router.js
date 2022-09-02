const Router = require("koa-router");

const userRouter = new Router({ prefix: "/user" });

const { verifyUser } = require("../middleware/user.middleware");

const { create } = require("../controller/user.controller");

userRouter.post("/", verifyUser, create);

module.exports = userRouter;
