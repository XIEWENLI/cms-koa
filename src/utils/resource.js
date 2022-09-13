const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");
const filesService = require("../service/file.service");

// 根据hash值获取文件
const getFileByhash = (hash) => {};

// 根据hash获取切片数组
const getFileSliceByhash = (hash) => {
  let readDirs = fs.readdirSync(
    path.resolve(__dirname, "../../upload/uploadPhotos/slice/")
  );

  readDirs = readDirs.filter((item) => {
    return item.includes(hash);
  });

  return readDirs;
};

// 上传切片
const upload = (ctx) => {
  var form = new multiparty.Form();
  form.parse(ctx.req, function (err, fields, files) {
    if (err) return;
    let fileSliceName = fields.hash[fields.hash.length - 1];
    let fileSlicePath = files.file[files.file.length - 1].path;

    // 存储切片
    let readStream = fs.createReadStream(fileSlicePath);
    let writeStream = fs.createWriteStream(
      path.resolve(
        __dirname,
        `../../upload/uploadPhotos/slice/${fileSliceName}`
      )
    );
    readStream.pipe(writeStream);
  });
};

// 合并切片
const merge = async (userId = 23, hash, suffix, type, len) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let fileHashName = hash + "." + suffix;

      // 查找文件是否存在，存在则不用合并
      let targetDirs = fs.readdirSync(
        path.resolve(__dirname, "../../upload/uploadPhotos/photos/")
      );
      let isExist = targetDirs.includes(fileHashName);

      // 获取并筛选出符合的文件切片的文件名
      let readDirs = fs.readdirSync(
        path.resolve(__dirname, "../../upload/uploadPhotos/slice/")
      );

      // 根据上传的切片数量和读取已上传的切片数量对比
      if (readDirs.length !== Number(len)) {
        resolve("6、切片不够上传失败~");
        return;
      }

      const temporary = [];
      readDirs = readDirs.filter((item) => {
        // 解决序号超过9的排序问题
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

      function deleteFile(item) {
        fs.unlinkSync(
          path.resolve(__dirname, `../../upload/uploadPhotos/slice/${item}`)
        );
      }

      function writeFile(item) {
        return new Promise((resolve, reject) => {
          let readStream = fs.createReadStream(
            path.resolve(__dirname, `../../upload/uploadPhotos/slice/${item}`),
            {
              flags: "r",
            }
          );

          let writeStream = fs.createWriteStream(
            path.resolve(
              __dirname,
              `../../upload/uploadPhotos/photos/${fileHashName}`
            ),
            { flags: "a+" }
          );
          readStream.pipe(writeStream);

          writeStream.on("finish", () => {
            deleteFile(item);
            resolve();
          });
        });
      }

      const file = filesService.mergeFile(userId, fileHashName, type);

      //file表存储信息
      resolve("6、上传成功~");
    }, 500);
  });
};

// 下载切片
const download = () => {
  const dirArr = fs.readdirSync(__dirname);

  const fileArr = dirArr.filter((file) => {
    return file.includes("a44357c2fd2d8a91531ce371e25e9635_");
  });

  fileArr.forEach((file) => {
    let read = fs.readFileSync(path.resolve(__dirname, `./${file}`));
    fs.writeFileSync(
      path.resolve(__dirname, `./a44357c2fd2d8a91531ce371e25e9635.png`),
      read,
      {
        flag: "a+",
      }
    );
  });
};

module.exports = {
  getFileByhash,
  getFileSliceByhash,
  upload,
  merge,
  download,
};
