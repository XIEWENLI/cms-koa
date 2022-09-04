const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");

dotenv.config();

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../app/keys/private.key")
);

module.exports = { POST_VALUE } = process.env;
module.exports.privateKey = privateKey;
