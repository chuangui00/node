const crypto = require("crypto");

const md5 = (value) => {
  cr = crypto.createHash("md5");
  return cr.update(value).digest("hex");
};

module.exports = md5;
