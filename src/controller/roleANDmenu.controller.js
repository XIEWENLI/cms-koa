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
  updateRole(ctx, next) {
    let role_id = ctx.request.query.role_id;
    let menu_idArr = ctx.request.query.menu_idArr;
    menu_idArr = menu_idArr ? menu_idArr.split(",") : 0;

    if (!role_id || !menu_idArr) {
      return ctx.app.emit("error", new Error(PARAM_NOT_NULL), ctx);
    }

    roleANDmenuServise.updateRole_Menu(role_id, menu_idArr);

    ctx.body = {
      status: 1,
      message: "权限修改成功~",
    };
  }
}

module.exports = new RoleController();
