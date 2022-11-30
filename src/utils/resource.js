const fs = require("fs");
const path = require("path");
// 解析formdata数据
const multiparty = require("multiparty");
const filesService = require("../service/file.service");
const { pathByTypeFn } = require("../utils/pathBytype");

// 根据hash获取切片名数组
const getFileSliceByhash = (hash, suffix) => {
  return new Promise((resolve, reject) => {
    let pathObj = pathByTypeFn(suffix);
    let readDirs = fs.readdirSync(
      path.resolve(__dirname, `../../${pathObj.pathSlice}/`)
    );

    readDirs = readDirs.filter((item) => {
      return item.includes(hash);
    });

    resolve(readDirs);
  });
};

// 上传切片
const upload = (ctx) => {
  return new Promise((resolve, reject) => {
    var form = new multiparty.Form();
    form.parse(ctx.req, function (err, fields, files) {
      if (err) return;
      let fileSliceName = fields.hash[fields.hash.length - 1];
      let fileSlicePath = files.file[files.file.length - 1].path;

      // 存储切片;
      let pathObj = pathByTypeFn(fields.suffix[0]);
      let readStream = fs.createReadStream(fileSlicePath);
      let writeStream = fs.createWriteStream(
        path.resolve(__dirname, `../../${pathObj.pathSlice}/${fileSliceName}`)
      );
      readStream.pipe(writeStream);
    });

    resolve("sccg");
  });
};

// 合并切片
const merge = async (user_id, hash, fileName, suffix, type, len) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let fileHashName = hash + "." + suffix;
      let pathObj = pathByTypeFn(suffix);

      // 查找文件是否存在
      let targetDirs = fs.readdirSync(
        path.resolve(__dirname, `../../${pathObj.path}/`)
      );
      let isExist = targetDirs.includes(fileHashName);

      // 获取并筛选出符合的文件切片的文件名
      let readDirs = fs
        .readdirSync(path.resolve(__dirname, `../../${pathObj.pathSlice}/`))
        .filter((item) => {
          return item.includes(hash);
        });

      // 根据上传的切片数量和读取已上传的切片数量对比
      if (readDirs.length !== Number(len)) {
        resolve("6、切片不够上传失败~");
        return;
      }

      const temporary = [];
      readDirs = readDirs.filter((item) => {
        // 解决序号超过9出现的排序问题
        fileIndex = Number(item.split("_")[1]);
        if (fileIndex >= 10) {
          temporary.push(item);
        }
        return item.includes(hash) && fileIndex < 10;
      });
      if (temporary.length > 0) {
        readDirs = [...readDirs, ...temporary];
      }

      // 合并切片写入成完整文件,不能用forEach，因为不能阻断
      for (const item of readDirs) {
        if (!isExist) {
          await writeFile(item);
        } else {
          deleteFile(item);
        }
      }

      //删除切片
      function deleteFile(item) {
        fs.unlinkSync(
          path.resolve(__dirname, `../../${pathObj.pathSlice}/${item}`)
        );
      }

      // 合并切片成文件
      function writeFile(item) {
        return new Promise((resolve, reject) => {
          let readStream = fs.createReadStream(
            path.resolve(__dirname, `../../${pathObj.pathSlice}/${item}`),
            {
              flags: "r",
            }
          );

          let writeStream = fs.createWriteStream(
            path.resolve(__dirname, `../../${pathObj.path}/${fileHashName}`),
            { flags: "a+" }
          );
          readStream.pipe(writeStream);

          writeStream.on("finish", () => {
            deleteFile(item);
            resolve();
          });
        });
      }

      //file表存储信息
      const file = await filesService.mergeFile(
        user_id,
        fileHashName,
        fileName,
        type
      );

      resolve("6、合并成功~");
    }, 500);
  });
};

// 获取文件信息
const downloadFiles = (user_id, type, limit, offset) => {
  return new Promise((resolve, reject) => {
    const filesInfo = filesService.getFilesInfo(user_id, type, limit, offset);
    resolve(filesInfo);
  });
};

module.exports = {
  getFileSliceByhash,
  upload,
  merge,
  downloadFiles,
};
