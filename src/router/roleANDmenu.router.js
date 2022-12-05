const Router = require("koa-router");

const {
  createRole,
  updateRole,
} = require("../controller/roleANDmenu.controller");

const roleRouter = new Router({ prefix: "/roleANDmenu" });

// 添加角色（附带角色添加权限）
roleRouter.get("/createRole", createRole);

// 修改角色权限
roleRouter.get("/updateRole", updateRole);

module.exports = roleRouter;
