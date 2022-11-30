const {
  upload,
  getFileSliceByhash,
  merge,
  downloadFiles,
} = require("../utils/resource");

class fileController {
  // 获取文件切片名数组
  async getFileSlice(ctx, next) {
    const res = await getFileSliceByhash(
      ctx.request.query.hash,
      ctx.request.query.suffix
    );

    ctx.body = res;
  }

  // 上传切片
  async uploadFileSlice(ctx, next) {
    const res = await upload(ctx);

    ctx.body = {
      status: 1,
      message: "上传成功~",
      user: ctx.user,
    };
  }

  // 合并切片
  async mergeFile(ctx, next) {
    const res = await merge(
      ctx.user?.id,
      ctx.request.query.hash,
      ctx.request.query.fileName,
      ctx.request.query.suffix,
      ctx.request.query.type,
      ctx.request.query.len
    );

    ctx.body = {
      status: 1,
      message: "合并成功~",
      file: res,
      user: ctx.user,
    };
  }

  //下载文件
  async getFiles(ctx, next) {
    const filesInfo = await downloadFiles(
      ctx.user?.id,
      ctx.request.query.type,
      ctx.request.query.limit,
      ctx.request.query.offset
    );

    ctx.body = filesInfo;
  }
}

module.exports = new fileController();
