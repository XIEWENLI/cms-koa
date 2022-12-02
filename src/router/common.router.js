const Router = require("koa-router");

const fileRouter = new Router({ prefix: "/common" });

fileRouter.get("/update");

module.exports = fileRouter;
