const pool = require("../app/database");

const getSumServise = async (tableName, type) => {
  if (!type) {
    let mysql = `SELECT COUNT(id) sum FROM ${tableName}`;
    const userSum = await pool.execute(mysql);
    return userSum[0][0];
  } else {
    let mysql = `SELECT COUNT(id) sum FROM ${tableName} WHERE type LIKE ?`;
    const userSum = await pool.execute(mysql, [type + "%"]);
    return userSum[0][0];
  }
};

module.exports = {
  getSumServise,
};
