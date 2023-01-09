const pool = require("../app/database");

class CommonService {
  async updateMemory(fileSize, sum) {
    const mysql = `SELECT memory FROM common`;
    const result = await pool.execute(mysql);

    // 单位，MB
    fileSize = Number((fileSize / 1024 / 1024).toFixed(3));
    fileSize = sum ? fileSize : -fileSize;
    let size = Number((result[0][0].memory + fileSize).toFixed(3));
    size < 0 ? 0 : size;

    const mysql2 = `UPDATE common SET memory = ?`;
    await pool.execute(mysql2, [size]);
  }

  async writeNumberOfUsers() {
    const mysql = `SELECT numberOfUsers FROM common`;
    const result = await pool.execute(mysql);

    let sum = ++result[0][0].numberOfUsers;

    const mysql2 = `UPDATE common SET numberOfUsers = ?`;
    await pool.execute(mysql2, [sum]);
  }

  // 修改common的所有状态其中之一
  async updateAllStatus(fieldName, status) {
    const mysql = `UPDATE common SET ${fieldName} = ?`;
    const result = await pool.execute(mysql, [Number(status)]);

    return result[0];
  }

  // 获取common的所有状态其中之一
  async getCommonStatus(fieldName) {
    const mysql = `SELECT ${fieldName} FROM common`;
    const result = await pool.execute(mysql);
    return result[0];
  }
}

module.exports = new CommonService();
