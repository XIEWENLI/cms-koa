const pool = require("../app/database");

class fileService {
  //合并切片信息写入
  async mergeFile(user_id = 1, fileHashName, fileName, type) {
    const res = await isFileExist(user_id, fileHashName);

    if (res.length < 1) {
      // 写入文件
      const mysql = `INSERT INTO file(fileHashName,fileName,user_id,type) VALUES(?,?,?,?)`;
      await pool.execute(mysql, [fileHashName, fileName, user_id, type]);

      const res2 = await isFileExist(user_id, fileHashName);

      return res2[0];
    }

    // file中文件是否已经存在
    async function isFileExist(user_id, fileHashName) {
      const mysql = `SELECT * FROM file WHERE fileHashName=? AND user_id=?`;
      const result = await pool.execute(mysql, [fileHashName, user_id]);
      return result[0];
    }

    return res[0];
  }

  // 根据user_id和type获取全部文件信息
  async getFileInfo(user_id = 1, type, limit = 12, offset = 0) {
    const mysql = `SELECT * FROM file WHERE user_id=? AND type LIKE ? LIMIT ${limit} OFFSET ${offset}`;
    const result = await pool.execute(mysql, [user_id, type + "%"]);
    return result[0];
  }

  // 获取单个文件信息
  async getOneFileInfo(user_id = 1, file_id = 1) {
    const mysql = `SELECT * FROM file WHERE user_id=? AND id=?`;
    const result = await pool.execute(mysql, [user_id, file_id]);
    return result[0];
  }
}

module.exports = new fileService();
