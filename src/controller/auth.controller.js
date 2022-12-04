class AuthController {
  success(ctx, next) {
    ctx.body = {
      status: 1,
      ...ctx.user,
    };
  }
}

module.exports = new AuthController();
