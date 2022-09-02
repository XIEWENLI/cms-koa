const pool = require("../app/database");
class UserServise {
  async create(user) {
    const statemant = `INSERT INTO test (username,password) VALUES(?,?)`;
    const result = await pool.execute(statemant, [
      user.username,
      user.password,
    ]);

    return result;
  }
}

module.exports = new UserServise();
