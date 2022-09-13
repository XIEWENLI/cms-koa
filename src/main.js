const app = require("./app");

const { POST_VALUE } = require("./app/config");

app.listen(POST_VALUE, () => {
  console.log(`服务器${POST_VALUE}端口启动成功！`);
});
