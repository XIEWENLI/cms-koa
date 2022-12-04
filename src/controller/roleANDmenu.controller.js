const roleANDmenuServise = require("../service/roleANDmenu.servise");
const { ROLENAME_EXIST } = require("../constants/user.constants");

class RoleController {
  async createRole(ctx, next) {
    let roleName = ctx.request.query.roleName;
    let grade = Number(ctx.request.query.grade);
    let menu_idArr = Array.from(ctx.request.query.menu_idArr);

    if (!roleName || !grade || !menu_idArr) {
      ctx.body = {
        status: 0,
        message: "参数不能为空~",
      };
      return;
    }

    // role表创建
    const res = await roleANDmenuServise.createRoleAndMenu(
      roleName,
      grade,
      menu_idArr
    );
    if (typeof res === "object" && res.length > 0) {
      ctx.app.emit("error", new Error(ROLENAME_EXIST), ctx);
      return;
    }

    // role_menu表角色添加权限
    let role_id = res;
    roleANDmenuServise.addRole_Menu(role_id, menu_idArr);

    ctx.body = {
      status: 1,
      message: "角色创建成功~",
    };
  }

  updateRole() {
    let user_id = ctx.request.query.user_id;
    let menu_id_arr = ctx.request.query.menu_id_arr;
  }
}

module.exports = new RoleController();
