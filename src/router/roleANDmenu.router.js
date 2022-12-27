const Router = require("koa-router");

const {
  createRole,
  updateRole,
  getRole,
  deleteRole,
  getPower,
} = require("../controller/roleANDmenu.controller");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const roleANDmenu = new Router({ prefix: "/roleANDmenu" });

// 查询所有角色（附带权限信息）
roleANDmenu.get("/getRole", verifyAuth, verifyPower, getRole);

//指定删除角色
roleANDmenu.get("/deleteRole", verifyAuth, verifyPower, deleteRole);

// 添加角色（附带角色添加权限）
roleANDmenu.get("/createRole", verifyAuth, verifyPower, createRole);

// 指定角色修改权限
roleANDmenu.get("/updateRole", verifyAuth, verifyPower, updateRole);

// 获取所有的权限
roleANDmenu.get("/getPower", getPower);

module.exports = roleANDmenu;
