const {
  upload,
  getFileSliceByhash,
  merge,
  getFileByhash,
} = require("../utils/resource");

class fileController {
  getFileSlice(ctx, next) {
    const res = getFileSliceByhash(ctx.request.query.hash);
    ctx.body = res;
  }

  async uploadFileSlice(ctx, next) {
    await upload(ctx);

    ctx.body = {
      code: 200,
      message: "上传成功~",
      user: ctx.user,
    };
  }

  async mergeFile(ctx, next) {
    const res = await merge(
      ctx.user?.id,
      ctx.request.query.hash,
      ctx.request.query.suffix,
      ctx.request.query.type,
      ctx.request.query.len
    );

    ctx.body = {
      code: 200,
      message: "合并成功~",
      file: res,
      user: ctx.user,
    };
  }
}

module.exports = new fileController();
