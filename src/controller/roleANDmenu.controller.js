const roleANDmenuServise = require("../service/roleANDmenu.servise");
const {
  ROLENAME_EXIST,
  PARAM_NOT_NULL,
} = require("../constants/user.constants");

class RoleController {
  async createRole(ctx, next) {
    let roleName = ctx.request.query.roleName;
    let grade = Number(ctx.request.query.grade);
    let menu_idArr = ctx.request.query.menu_idArr;
    menu_idArr = menu_idArr ? menu_idArr.split(",") : 0;

    if (!roleName || !grade || !menu_idArr) {
      return ctx.app.emit("error", new Error(PARAM_NOT_NULL), ctx);
    }

    // role表创建
    const res = await roleANDmenuServise.createRole(
      roleName,
      grade,
      menu_idArr
    );
    if (typeof res === "object" && res.length > 0) {
      ctx.app.emit("error", new Error(ROLENAME_EXIST), ctx);
      return;
    }

    ctx.body = {
      status: 1,
      message: "角色创建成功~",
    };
  }

  // 修改角色权限
  async updateRole(ctx, next) {
    let role_id = ctx.request.query.role_id;
    let menu_idArr = ctx.request.query.menu_idArr;
    menu_idArr = menu_idArr ? menu_idArr.split(",") : 0;

    if (!role_id || !menu_idArr) {
      return ctx.app.emit("error", new Error(PARAM_NOT_NULL), ctx);
    }

    await roleANDmenuServise.updateRole_Menu(role_id, menu_idArr);

    ctx.body = {
      status: 1,
      message: "权限修改成功~",
    };
  }

  // 查询所有角色
  async getRole(ctx, next) {
    const res = await roleANDmenuServise.getRoleAndPower();

    ctx.body = {
      status: 1,
      message: res,
    };
  }

  //指定删除角色
  deleteRole(ctx, next) {
    let role_id = ctx.request.query.role_id;
    roleANDmenuServise.deleteRoleById(role_id);

    ctx.body = {
      status: 1,
      message: "删除成功",
    };
  }

  // 获取所有权限
  async getPower(ctx, next) {
    const res = await roleANDmenuServise.power();

    ctx.body = {
      status: 1,
      message: res,
    };
  }
}

module.exports = new RoleController();
