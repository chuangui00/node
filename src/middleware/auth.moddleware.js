const Md5 = require("../util/md5");
const { getPassword } = require("../service/user.service");
const { PUBLIC_KEY } = require("../app/config");
const jwt = require("jsonwebtoken");
const Error_information = require("../constants/error");
const { getName } = require("../service/user.service");

class login {
  async login(ctx, next) {
    let { name, password } = ctx.request.body;
    if (
      !name ||
      !password ||
      !name.trim().length ||
      !password.toString().trim().length
    ) {
      const error = new Error(Error_information.kong);
      return ctx.app.emit("error", error, ctx);
    }
    const result = await getName(name);
    if (!result[0].length) {
      const error = new Error(Error_information.weizhuce);
      return ctx.app.emit("error", error, ctx);
    }
    if (Md5(password) === result[0][0].password) {
      ctx.user = result[0][0]; //登录的用户信息添加到ctx.user内
      console.log(ctx.user);
      await next();
    } else {
      ctx.body = "密码错误";
    }
  }
  async isToken(ctx, next) {
    try {
      console.log("经过了Token验证");
      let token = ctx.request.header.authorization;
      let Token = token.replace("Bearer", "").trim();
      let result = jwt.verify(Token, PUBLIC_KEY, {
        algorithms: ["RS256"],
      });
      ctx.user = result; //解析token后返回加密前的内容
      await next();
    } catch (error) {
      console.log(error);
      ctx.body = "text,token失效";
    }
  }
}

module.exports = new login();
