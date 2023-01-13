const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../app/keys/private.key")
);

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../app/keys/public.key")
);

module.exports.privateKey = privateKey;
module.exports.publicKey = publicKey;
