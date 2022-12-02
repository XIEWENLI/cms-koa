const {
  upload,
  getFileSliceByhash,
  merge,
  getinfo,
  download,
} = require("../utils/resource");

const { RESOURCE_NOT_EXIST } = require("../constants/user.constants");

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

  // 根据user_id和type获取全部文件信息
  async getFileInfo(ctx, next) {
    const fileInfo = await getinfo(
      ctx.user?.id,
      ctx.request.query.type,
      ctx.request.query.limit,
      ctx.request.query.offset
    );

    ctx.body = fileInfo;
  }

  //下载文件
  async downloadFile(ctx, next) {
    const { file, type } = await download(
      ctx.user?.id,
      ctx.request.query.file_id
    );

    if (!file || !type) {
      return ctx.app.emit("error", new Error(RESOURCE_NOT_EXIST), ctx);
    }

    if (ctx.download) {
      ctx.response.set("content-type", type);
    }
    ctx.body = file;
  }
}

module.exports = new fileController();
