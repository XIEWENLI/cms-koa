const pool = require("../app/database");
const fs = require("fs");
const path = require("path");
const { writeMomery } = require("../hooks/writeMomery");

class fileService {
  //合并切片后信息写入
  async mergeFile(user_id = 1, fileHashName, fileName, type, fileSize) {
    const res = await isFileExist(user_id, fileHashName);
    // 文件大小，单位M

    if (res.length < 1) {
      // 写入文件
      const mysql = `INSERT INTO file(fileHashName,fileName,user_id,type,size) VALUES(?,?,?,?,?)`;
      await pool.execute(mysql, [
        fileHashName,
        fileName,
        user_id,
        type,
        Number(fileSize),
      ]);

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

  // 删除文件
  async del(file_id, userName, url) {
    // 查找目标用户id
    const mysql = `SELECT * FROM user WHERE username=?`;
    const result = await pool.execute(mysql, [userName]);
    let user_id = result[0][0].id;

    // 获取fileInfo
    const mysql2 = `SELECT * FROM file WHERE id=?`;
    const result2 = await pool.execute(mysql2, [Number(file_id)]);
    let fileHashName = result2[0][0].fileHashName;

    // 删除
    const mysql3 = `DELETE FROM file WHERE id=? AND user_id=?`;
    pool.execute(mysql3, [Number(file_id), Number(user_id)]).then(async () => {
      // 该文件无其它用户引用则删除
      const mysql4 = `SELECT * FROM file WHERE id=?`;
      const result4 = await pool.execute(mysql4, [Number(file_id)]);

      if (result4[0][0] === undefined) {
        // 获取文件大小存储到common表
        writeMomery(url, fileHashName, 0);

        fs.unlinkSync(path.resolve(__dirname, `../../${url}/${fileHashName}`));
      }

      return result[0];
    });
  }
}

module.exports = new fileService();
