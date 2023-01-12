const Router = require("koa-router");

const {
  verifyRegister,
  verifyRegister2,
  passwordMD5,
  passwordMD52,
  verifyLogin,
  verifyLogin2,
} = require("../middleware/user.middleware");
const {
  register,
  register2,
  login,
  login2,
  getUsers,
  updateUserLoginStatus,
  delUser,
  updateRole,
  getUserById,
  getUserByuserName,
} = require("../controller/user.controller");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const userRouter = new Router({ prefix: "/user" });

// 注册
userRouter.post("/register", verifyRegister, passwordMD5, register);

userRouter.post("/register2", verifyRegister2, passwordMD52, register2);

// 登录
userRouter.post("/login", verifyLogin, login);

userRouter.post("/login2", verifyLogin2, login2);

// 删除用户
userRouter.get("/delUser", delUser);

// 获取自定条件的所有用户
userRouter.get("/getUsers", verifyAuth, verifyPower, getUsers);

// 对单个用户 开启/禁止 登录，user表
userRouter.get(
  "/updateUserLoginStatus",
  verifyAuth,
  verifyPower,
  updateUserLoginStatus
);

// 修改角色
userRouter.get("/updateRole", verifyAuth, verifyPower, updateRole);

// 根据用户id获取用户信息
userRouter.get("/getUserById", verifyAuth, verifyPower, getUserById);

// 根据用户userName获取用户信息
userRouter.get(
  "/getUserByuserName",
  verifyAuth,
  verifyPower,
  getUserByuserName
);

module.exports = userRouter;
