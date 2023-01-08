const Router = require("koa-router");

const {
  getFileSlice,
  uploadFileSlice,
  mergeFile,
  getFileInfo,
  downloadFile,
} = require("../controller/file.controller");
const { obtain, download } = require("../middleware/file.middleware");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const fileRouter = new Router({ prefix: "/file" });

// 获取已上传的文件切片数组
fileRouter.get("/getFileSlice", getFileSlice);

// 文件上传切片
fileRouter.post("/uploadFileSlice", uploadFileSlice);

// 合并文件切片
fileRouter.get("/mergeFile", mergeFile);

// 获取指定条件的全部文件信息
fileRouter.get("/getFileInfo", getFileInfo);

// 获取文件
fileRouter.get("/getFile", obtain, downloadFile);

// 下载文件
fileRouter.get(
  "/downloadFile",
  verifyAuth,
  verifyPower,
  download,
  downloadFile
);

module.exports = fileRouter;
