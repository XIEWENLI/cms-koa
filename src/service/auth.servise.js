const pool = require("../app/database");

class AuthServise {
  async power(path, role_id) {
    const mysql = `SELECT * FROM menu WHERE menuURL=?`;
    const result = await pool.execute(mysql, [path]);

    let menu_id = result[0][0].id;

    const mysql2 = `SELECT * FROM role_menu WHERE role_id=? AND menu_id=?`;
    const result2 = await pool.execute(mysql2, [role_id, menu_id]);

    return result2[0];
  }
}

module.exports = new AuthServise();
