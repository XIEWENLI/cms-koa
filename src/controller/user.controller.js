const jwt = require("jsonwebtoken");

const { privateKey } = require("../app/config");
const userServise = require("../service/user.service");

class UserController {
  async register(ctx, next) {
    const result = await userServise.create(ctx.request.body);
    ctx.body = result;
  }

  async login(ctx, next) {
    const { id, username } = ctx.user;
    var token = jwt.sign({ id, username }, privateKey, {
      expiresIn: 60,
      algorithm: "RS256",
    });

    ctx.body = { id, username, token };
  }
}

module.exports = new UserController();
