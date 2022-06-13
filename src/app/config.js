const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.key")
);
module.exports = {
  APP_POST,
  MYSQL_HOST,
  MYSQL_POST,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;
//dotenv: Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中。
//process.env属性返回一个包含用户环境信息的对象。

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
