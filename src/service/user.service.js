const pool = require("../app/database");
class UserServise {
  // 创建用户
  async create(user) {
    let role_id = 2;
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
      case "username":
        mysql = `SELECT * FROM user WHERE username=?`;
        break;
    }
    const result = await pool.execute(mysql, [paramValue]);
    return result[0];
  }

  // 获取自定条件的所有用户
  async getUsersInfo(limit = 12, offset = 0) {
    const mysql = `SELECT id,username,wx_openid,loginStatus,role_id FROM user WHERE id !=1 LIMIT ${limit} OFFSET ${offset}`;
    const result = await pool.execute(mysql);
    return result[0];
  }

  // 获取menu
  async getMenu(role_id) {
    const mysql = `SELECT * FROM menu 
                  WHERE id in (SELECT menu_id FROM role_menu WHERE role_id=?)`;
    const result = await pool.execute(mysql, [role_id]);

    return result[0];
  }

  // 修改单个用户 登录\禁止 状态
  async userLoginStatus(user_id, loginStatus) {
    const mysql = `UPDATE user SET loginStatus = ? WHERE id = ?`;
    const result = await pool.execute(mysql, [loginStatus, user_id]);

    return result[0];
  }

  // 获取用户 登录/禁止 状态
  async getUserStatus(user_id) {
    const mysql = `SELECT loginStatus FROM user WHERE id=?`;
    const result = await pool.execute(mysql, [user_id]);

    return result[0];
  }
}

module.exports = new UserServise();
