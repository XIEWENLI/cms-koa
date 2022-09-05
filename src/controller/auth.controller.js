class AuthController {
  success(ctx, next) {
    ctx.body = {
      code: 200,
      message: "授权成功~",
      user: ctx.user,
    };
  }
}

module.exports = new AuthController();
