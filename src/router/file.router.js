const Router = require("koa-router");

const {
  getFileSlice,
  uploadFileSlice,
  mergeFile,
  getFileInfo,
  downloadFile,
  deleteFile,
} = require("../controller/file.controller");
const { obtain, download } = require("../middleware/file.middleware");
const { verifyAuth, verifyPower } = require("../middleware/auth.middleware");

const fileRouter = new Router({ prefix: "/file" });

// 获取已上传的文件切片数组
fileRouter.get("/getFileSlice", verifyAuth, verifyPower, getFileSlice);

// 文件上传切片
fileRouter.post("/uploadFileSlice", verifyAuth, verifyPower, uploadFileSlice);

// 合并文件切片
fileRouter.get("/mergeFile", verifyAuth, verifyPower, mergeFile);

// 获取指定条件的全部文件信息
fileRouter.get("/getFileInfo", verifyAuth, verifyPower, getFileInfo);

// 获取文件
fileRouter.get("/getFile", verifyAuth, verifyPower, obtain, downloadFile);

// 下载文件
fileRouter.get(
  "/downloadFile",
  verifyAuth,
  verifyPower,
  download,
  downloadFile
);

// 删除文件
fileRouter.get("/deleteFile", deleteFile);

module.exports = fileRouter;
