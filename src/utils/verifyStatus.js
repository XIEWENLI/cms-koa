const commonService = require("../service/common.service.js");
const userServise = require("../service/user.service");

// common表字段的状态验证_所有
const verifyCommonStatus = async (fieldName) => {
  const res = await commonService.getCommonStatus(fieldName);

  return Number(res[0][fieldName]);
};

// user表字段的登录状态验证_单个
const verifyUserStatus = async (user_id) => {
  const res = await userServise.getUserStatus(user_id);

  return Number(res[0]["loginStatus"]);
};

module.exports = {
  verifyCommonStatus,
  verifyUserStatus,
};
