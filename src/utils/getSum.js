const pool = require("../app/database");

const getSumServise = async (tableName, type, web = 0, user_id) => {
  if (!type) {
    let mysql = `SELECT COUNT(id) sum FROM ${tableName}`;
    const userSum = await pool.execute(mysql);
    return userSum[0][0];
  } else if (!Number(web)) {
    let mysql = `SELECT COUNT(id) sum FROM ${tableName} WHERE type LIKE ?`;
    const userSum = await pool.execute(mysql, [type + "%"]);
    return userSum[0][0];
  } else {
    let mysql = `SELECT COUNT(id) sum FROM ${tableName} WHERE user_id=?  type LIKE ?`;
    const userSum = await pool.execute(mysql, [user_id, type + "%"]);
    return userSum[0][0];
  }
};

module.exports = {
  getSumServise,
};
