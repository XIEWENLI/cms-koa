const fs = require("fs");
const path = require("path");
const pool = require("../app/database");
const commonService = require("../service/common.service");
class UserServise {
  // 创建用户
  async create(user, role_id = 2) {
    const mysql = `INSERT INTO user(username,password,role_id) VALUES(?,?,?)`;
    const result = await pool.execute(mysql, [
      user.username,
      user.password,
      role_id,
    ]);

    return result;
  }

  // 删除用户
  async delUserByUserId(user_id) {
    const mysql = `SELECT * FROM file WHERE user_id=?`;
    const result = await pool.execute(mysql, [user_id]);

    // 删除该用户的所有资源
    result[0].forEach((item) => {
      let url = path.resolve(
        __dirname,
        `../../upload/uploadPhotos/photos/${item.fileHashName}`
      );

      let url2 = path.resolve(
        __dirname,
        `../../upload/uploadVideo/videos/${item.fileHashName}`
      );

      // 文件存在时err = false；文件不存在时err = true
      fs.access(url, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlinkSync(url);
          commonService.updateMemory(item.size, 0);
        } else {
          fs.unlinkSync(url2);
          commonService.updateMemory(item.size, 0);
        }
      });
    });

    const mysql2 = `DELETE FROM user WHERE id=?;`;
    const result2 = await pool.execute(mysql2, [user_id]);

    // 修改common的user数量
    const mysql3 = `SELECT numberOfUsers FROM common`;
    const result3 = await pool.execute(mysql3);

    let sum = result3[0][0].numberOfUsers - 1;

    const mysql4 = `UPDATE common SET numberOfUsers = ?`;
    await pool.execute(mysql4, [sum]);

    return result2[0];
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
  async getUsersInfo(limit = 10, offset = 0, inputVal) {
    inputVal = inputVal === "" ? undefined : inputVal;
    if (inputVal === undefined) {
      const mysql = `SELECT id,username,loginStatus,role_id FROM user WHERE id !=1 LIMIT ${limit} OFFSET ${offset}`;
      const result = await pool.execute(mysql);

      return result[0];
    } else {
      const mysql = `SELECT id,username,loginStatus,role_id FROM user WHERE id !=1 AND username=? LIMIT ${limit} OFFSET ${offset}`;
      const result = await pool.execute(mysql, [inputVal]);
      return result[0];
    }
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

  // 修改角色
  async updateRole(user_id, role_id) {
    const mysql = `UPDATE user SET role_id = ? WHERE id = ?`;
    const result = await pool.execute(mysql, [
      Number(role_id),
      Number(user_id),
    ]);

    return result[0];
  }

  // 根据用户id获取用户信息
  async getUserById(user_id) {
    const mysql = `SELECT * FROM user WHERE id = ?`;
    const result = await pool.execute(mysql, [Number(user_id)]);

    return result[0];
  }

  // 根据用户userName获取用户信息
  async getUserByuserName(userName) {
    const mysql = `SELECT * FROM user WHERE username = ?`;
    const result = await pool.execute(mysql, [userName]);

    return result[0];
  }
}

module.exports = new UserServise();
