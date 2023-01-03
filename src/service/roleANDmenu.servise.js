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
    // 先删除所有权限
    const mysql = `DELETE FROM role_menu WHERE role_id=?`;
    await pool.execute(mysql, [role_id]);

    // 再角色添加权限
    this.addRole_Menu(role_id, menu_idArr);
  }

  // 查询所有角色（附带每个角色的权限）
  async getRoleAndPower(limit = 10, offset = 0) {
    const mysql = `SELECT role.id, role.roleName, role.grade,
    JSON_ARRAYAGG(JSON_OBJECT('id',menu.id,'path', menu.menuURL, 'powerName', menu.name)) as power
    FROM role
    LEFT JOIN role_menu ON role.id = role_menu.role_id
    LEFT JOIN menu ON role_menu.menu_id = menu.id
    GROUP BY role.id LIMIT ${limit} OFFSET ${offset};`;
    const result = await pool.execute(mysql);

    return result[0];
  }

  //指定删除角色
  async deleteRoleById(role_id) {
    const mysql = `DELETE FROM role WHERE id=?`;
    await pool.execute(mysql, [Number(role_id)]);
  }

  // 获取所有权限
  async power() {
    const mysql = `SELECT * FROM menu`;
    const result = await pool.execute(mysql);

    return result[0];
  }

  // 获取指定角色接口
  async getRoleById(role_id) {
    const mysql = `SELECT * FROM role WHERE id=?`;
    const result = await pool.execute(mysql, [role_id]);

    return result[0];
  }

  // 查询所有角色（不附带权限信息）
  async getAllRole() {
    const mysql = `SELECT * FROM role WHERE id !=1`;
    const result = await pool.execute(mysql);

    return result[0];
  }
}

module.exports = new RoleANDmenu();
