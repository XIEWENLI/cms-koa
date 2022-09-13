class AuthController {
  success(ctx, next) {
    ctx.body = ctx.user;
  }
}

module.exports = new AuthController();
