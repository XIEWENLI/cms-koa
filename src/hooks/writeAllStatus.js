const commonService = require("../service/common.service");

const writeAllStatus = (fieldName, status) => {
  commonService.updateAllStatus(fieldName, status);
};

module.exports = {
  writeAllStatus,
};
