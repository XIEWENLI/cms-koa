const Router = require("koa-router");

const {
  createRole,
  updateRole,
  getRole,
  deleteRole,
} = require("../controller/roleANDmenu.controller");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const roleRouter = new Router({ prefix: "/roleANDmenu" });

// 查询所有角色（附带权限信息）
roleRouter.get("/getRole", verifyAuth, verifyPower, getRole);

//指定删除角色
roleRouter.get("/deleteRole", verifyAuth, verifyPower, deleteRole);

// 添加角色（附带角色添加权限）
roleRouter.get("/createRole", verifyAuth, verifyPower, createRole);

// 指定角色修改权限
roleRouter.get("/updateRole", verifyAuth, verifyPower, updateRole);

module.exports = roleRouter;
