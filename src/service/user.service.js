const pool = require("../app/database");
class UserServise {
  // 创建用户
  async create(user) {
    let role_id = user.role_id ? user.role_id : 1;
    const mysql = `INSERT INTO user(username,password,role_id) VALUES(?,?,?)`;
    const result = await pool.execute(mysql, [
      user.username,
      user.password,
      role_id,
    ]);

    return result;
  }

  // 根据传过来的条件和参数查询用户
  async getUser(param, paramValue) {
    let mysql;
    switch (param) {
      case (param = "username"):
        mysql = `SELECT * FROM user WHERE username=?`;
        break;
    }
    const result = await pool.execute(mysql, [paramValue]);
    return result[0];
  }

  // 获取menu
  async getMenu(role_id) {
    const mysql = `SELECT * FROM menu 
                  WHERE id in (SELECT menu_id FROM role_menu WHERE role_id=?)`;
    const result = await pool.execute(mysql, [role_id]);

    return result[0];
  }
}

module.exports = new UserServise();
