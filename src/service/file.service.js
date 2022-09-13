const pool = require("../app/database");

class fileService {
  async getFile(hash) {
    const mysql = ``;
    const result = await pool.execute(mysql, []);
    return result[0];
  }

  async mergeFile(userId, fileHashName, type) {
    const res = await sl(userId, fileHashName);

    if (res.length < 1) {
      const mysql = `INSERT INTO file(fileHashName,userId,type) VALUES(?,?,?)`;
      await pool.execute(mysql, [fileHashName, userId, type]);

      const res2 = await sl(userId, fileHashName);

      return res2[0];
    }

    async function sl(userId, fileHashName) {
      const mysql = `SELECT * FROM file WHERE fileHashName=? AND userId=?`;
      const result = await pool.execute(mysql, [fileHashName, userId]);
      return result[0];
    }

    return res[0];
  }
}

module.exports = new fileService();
