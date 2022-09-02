async function verifyUser(ctx, next) {
  console.log("用户认证");
  await next();
}

module.exports = {
  verifyUser,
};
