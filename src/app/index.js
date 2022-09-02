const koa = require("koa");
const app = new koa();

const bodyparser = require("koa-bodyparser");

const useRouter = require("../router");
const errFn = require("./errFn");

// 请求体解析
app.use(bodyparser());

// 路由
useRouter(app);

// 错误捕获ctx.app.emit("error",参数)
app.on("error", errFn);

module.exports = app;
