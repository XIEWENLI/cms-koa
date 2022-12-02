const pool = require("../app/database");

class commonService {
  async updateMemory(fileSize) {
    const mysql = `SELECT memory FROM common`;
    const result = await pool.execute(mysql);

    // 单位，MB
    fileSize = Number((fileSize / 1024 / 1024).toFixed(3));
    let size = Number((result[0][0].memory + fileSize).toFixed(3));
    size < 0 ? 0 : size;

    const mysql2 = `UPDATE common SET memory = ?`;
    await pool.execute(mysql2, [size]);
  }
}

module.exports = new commonService();
