const pool = require("../app/database");

const getSumServise = async (tableName) => {
  const mysql2 = `SELECT COUNT(id) sum FROM ${tableName}`;
  const userSum = await pool.execute(mysql2);

  return userSum[0][0];
};

module.exports = {
  getSumServise,
};
