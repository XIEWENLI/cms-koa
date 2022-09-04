const pool = require("../app/database");
class UserServise {
  async create(user) {
    let role_id = user.roleId ? user.roleId : 1;
    const mysql = `INSERT INTO user(username,password,name,headUrl,role_id) VALUES(?,?,?,?,?)`;
    const result = await pool.execute(mysql, [
      user.username,
      user.password,
      user.name,
      user.headUrl,
      role_id,
    ]);

    return result;
  }

  async getUserByUserName(username) {
    const mysql = `SELECT * FROM user WHERE username=?`;
    const result = await pool.execute(mysql, [username]);
    return result[0];
  }
}

module.exports = new UserServise();
