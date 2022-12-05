const pool = require("../app/database");

class RoleANDmenu {
  // 创建角色
  async createRole(roleName, grade, menu_idArr) {
    let result = await select(roleName);

    if (result[0].length <= 0) {
      const mysql2 = `INSERT INTO role(roleName,grade) VALUES(?,?);`;
      await pool.execute(mysql2, [roleName, grade]);

      let result3 = await select(roleName);

      // 角色添加权限
      this.addRole_Menu(result3[0][0].id, menu_idArr);
      return;
    }

    async function select(roleName) {
      const mysql = `SELECT * FROM role WHERE roleName=?`;
      const result = await pool.execute(mysql, [roleName]);
      return result;
    }

    return result[0];
  }

  // role_menu角色添加权限
  async addRole_Menu(role_id, menu_idArr) {
    for (let item of menu_idArr) {
      const mysql = `INSERT INTO role_menu(menu_id,role_id) VALUES(?,?);`;
      await pool.execute(mysql, [Number(item), role_id]);
    }
  }

  // role_menu修改
  async updateRole_Menu(role_id, menu_idArr) {
    const mysql = `DELETE FROM role_menu WHERE role_id=?`;
    await pool.execute(mysql, [role_id]);

    // 角色添加权限
    this.addRole_Menu(role_id, menu_idArr);
  }
}

module.exports = new RoleANDmenu();
