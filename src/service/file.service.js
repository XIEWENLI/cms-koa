const pool = require("../app/database");
const fs = require("fs");
const path = require("path");
const { writeMomery } = require("../hooks/writeMomery");

class fileService {
  //合并切片后信息写入
  async mergeFile(user_id, fileHashName, fileName, type, fileSize) {
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
  async getFileInfo(user_id, type, limit = 12, offset = 0, inputVal, web = 0) {
    inputVal = inputVal === "" ? undefined : inputVal;

    // 查询用户的role_id
    let mysql = `SELECT * FROM user WHERE id=?`;
    const result = await pool.execute(mysql, [user_id]);
    const role_id = result[0][0].role_id;

    if (inputVal !== undefined && role_id !== 3 && !Number(web)) {
      // 管理员搜索查询的file
      let mysql2 = `SELECT * FROM user WHERE username = ?`;
      const result2 = await pool.execute(mysql2, [inputVal]);
      if (result2[0].length <= 0) {
        return [];
      }
      let mysql3 = `SELECT * FROM file WHERE user_id=? AND type LIKE ? LIMIT ${limit} OFFSET ${offset}`;

      const result3 = await pool.execute(mysql3, [
        result2[0][0].id,
        type + "%",
      ]);

      return result3[0];
    } else if (inputVal === undefined && role_id !== 3 && !Number(web)) {
      // 管理查询的file（不带inputVal搜索值）
      let mysql4 = `SELECT * FROM file WHERE type LIKE ? LIMIT ${limit} OFFSET ${offset}`;

      const result4 = await pool.execute(mysql4, [type + "%"]);
      return result4[0];
    } else if (Number(web)) {
      // 个人用户的file
      let mysql5 = `SELECT * FROM file WHERE user_id=? AND type LIKE ? LIMIT ${limit} OFFSET ${offset}`;

      const result5 = await pool.execute(mysql5, [user_id, type + "%"]);
      return result5[0];
    }
  }

  // 获取单个文件信息
  async getOneFileInfo(user_id, file_id) {
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
      const mysql4 = `SELECT * FROM file WHERE fileHashName=?`;
      const result4 = await pool.execute(mysql4, [fileHashName]);

      if (result4[0][0] === undefined) {
        // 获取文件大小存储到common表
        await writeMomery(url, fileHashName, 0);

        // 定时器解决部署上线后，改变common表字时段出现先删除问题
        setTimeout(() => {
          fs.unlinkSync(
            path.resolve(__dirname, `../../${url}/${fileHashName}`)
          );
        }, 500);
      }

      return result[0];
    });
  }
}

module.exports = new fileService();
