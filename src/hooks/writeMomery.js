const fs = require("fs");
const path = require("path");

const commonService = require("../service/common.service");

// 获取改文件大小存储到common表
const writeMomery = (p, fileHashName, sum = 1) => {
  fs.stat(
    path.resolve(__dirname, `../../${p}/${fileHashName}`),
    (err, data) => {
      if (err === null) {
        size = data.size;
        commonService.updateMemory(size, sum);
      }
    }
  );
};

module.exports = {
  writeMomery,
};
