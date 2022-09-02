const app = require("./src/app");

const { POST_VALUE } = require("./src/app/config");

app.listen(POST_VALUE, () => {
  console.log(`服务器${POST_VALUE}端口启动成功！`);
});
