const Router = require("koa-router");

const {
  getFileSlice,
  uploadFileSlice,
  mergeFile,
  getFiles,
} = require("../controller/file.controller");
const { verifyAuth } = require("../middleware/file.middleware");

const fileRouter = new Router({ prefix: "/file" });

// 获取已上传的文件切片数组
fileRouter.get("/getFileSlice", getFileSlice);

// 文件上传切片
fileRouter.post("/uploadFileSlice", uploadFileSlice);

// 合并文件切片
fileRouter.get("/mergeFile", mergeFile);

// 获取文件
fileRouter.get("/getFiles", getFiles);

module.exports = fileRouter;
