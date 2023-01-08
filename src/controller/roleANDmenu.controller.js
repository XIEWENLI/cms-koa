const roleANDmenuServise = require("../service/roleANDmenu.servise");
const {
  ROLENAME_EXIST,
  PARAM_NOT_NULL,
} = require("../constants/user.constants");

class RoleController {
  async createRole(ctx, next) {
    let roleName = ctx.request.query.roleName;
    let grade = Number(ctx.request.query.grade);
    grade = grade === 1 ? 2 : grade;
    let menu_idArr = ctx.request.query.menu_idArr;
    menu_idArr = menu_idArr ? menu_idArr.split(",") : [];

    if (!roleName || !grade) {
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
    menu_idArr = menu_idArr ? menu_idArr.split(",") : [];

    if (!role_id) {
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
    const res = await roleANDmenuServise.getRoleAndPower(
      ctx.request.query.limit,
      ctx.request.query.offset
    );

    ctx.body = {
      status: 1,
      message: res,
    };
  }

  //指定删除角色
  async deleteRole(ctx, next) {
    let role_id = ctx.request.query.role_id;
    const res = await roleANDmenuServise.deleteRoleById(role_id);

    if (!res.state) {
      ctx.body = {
        status: res.state,
        message: res.massage,
      };
    } else {
      ctx.body = {
        status: res.state,
        message: res.massage,
      };
    }
  }

  // 获取所有权限
  async getPower(ctx, next) {
    const res = await roleANDmenuServise.power();

    ctx.body = {
      status: 1,
      message: res,
    };
  }

  // 获取指定角色接口
  async getRoleById(ctx, next) {
    const res = await roleANDmenuServise.getRoleById(ctx.request.query.role_id);

    ctx.body = {
      status: 1,
      message: res,
    };
  }

  // 查询所有角色（不附带权限信息）
  async getAllRole(ctx, next) {
    const res = await roleANDmenuServise.getAllRole();

    ctx.body = {
      status: 1,
      message: res,
    };
  }
}

module.exports = new RoleController();
