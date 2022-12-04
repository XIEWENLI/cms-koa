const commonService = require("../service/common.service");

const writeNumberOfUsers = () => {
  commonService.writeNumberOfUsers();
};

module.exports = {
  writeNumberOfUsers,
};
