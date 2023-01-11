const {
  upload,
  getFileSliceByhash,
  merge,
  getinfo,
  download,
  delFile,
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
    let user_id = ctx.request.query.user_id;
    if (!user_id) {
      user_id = ctx.user.id;
    }
    user_id = Number(user_id);

    const res = await merge(
      user_id,
      ctx.request.query.hash,
      ctx.request.query.fileName,
      ctx.request.query.suffix,
      ctx.request.query.type,
      ctx.request.query.len,
      ctx.request.query.fileSize
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
      ctx.user.id,
      ctx.request.query.type,
      ctx.request.query.limit,
      ctx.request.query.offset,
      ctx.request.query.inputVal
    );

    ctx.body = {
      status: 1,
      message: fileInfo,
    };
  }

  //获取和下载文件
  async downloadFile(ctx, next) {
    const fileName = ctx.request.query.fileName;
    let user_id = ctx.request.query.user_id;
    const user_id2 = ctx.user.id;

    if (user_id === undefined) {
      user_id = user_id2;
    }

    const { file, type, size } = await download(
      user_id,
      ctx.request.query.file_id
    );

    if (!file || !type) {
      return ctx.app.emit("error", new Error(RESOURCE_NOT_EXIST), ctx);
    }

    if (!ctx.download) {
      // 解决前端播放进度条拖动失效问题
      ctx.set("Accept-Ranges", "bytes");
      ctx.set("Content-Length", size);
      // 使文件在线展示，而不是默认下载
      ctx.set("content-type", type);
    } else {
      // 使文件下载时设置的默认文件名
      ctx.attachment(fileName);
    }

    ctx.body = file;
  }

  // 删除文件
  async deleteFile(ctx, next) {
    await delFile(
      ctx.request.query.file_id,
      ctx.request.query.userName,
      ctx.request.query.url
    );

    ctx.body = {
      status: 1,
      message: "删除成功~",
    };
  }
}

module.exports = new fileController();
