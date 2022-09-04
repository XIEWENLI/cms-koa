const Router = require("koa-router");

const userRouter = new Router({ prefix: "/user" });

const {
  verifyRegister,
  passwordMD5,
  verifyLogin,
} = require("../middleware/user.middleware");
const { register, login } = require("../controller/user.controller");

// 注册
userRouter.post("/register", verifyRegister, passwordMD5, register);

// 登录
userRouter.post("/login", verifyLogin, login);

module.exports = userRouter;
