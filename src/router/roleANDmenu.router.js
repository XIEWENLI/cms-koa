const Router = require("koa-router");

const { createRole } = require("../controller/roleANDmenu.controller");

const roleRouter = new Router({ prefix: "/roleANDmenu" });

// 添加角色（附带角色添加权限）
roleRouter.get("/createRole", createRole);

module.exports = roleRouter;
