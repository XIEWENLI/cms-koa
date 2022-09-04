const crypto = require("crypto");

function toMD5(password) {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
}

module.exports = toMD5;
