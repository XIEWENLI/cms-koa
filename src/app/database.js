const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "personal_website",
  user: "root",
  password: "Xwl1223260658.",
});

module.exports = pool.promise();
