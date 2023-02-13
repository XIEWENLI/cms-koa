const fs = require("fs");
const path = require("path");

const commonService = require("../service/common.service");

// 获取改文件大小存储到common表
const writeMomery = (p, fileHashName, sum = 1, len = 1) => {
  fs.stat(
    path.resolve(__dirname, `../../${p}/${fileHashName}`),
    async (err, data) => {
      if (err === null) {
        let size = data.size;
        const result = await commonService.updateMemory(size, sum, len);
        return result;
      }
    }
  );
};

module.exports = {
  writeMomery,
};
