const app = require("../app");
const Error_information = require("../constants/error");
const { getName } = require("../service/user.service");

const errorHandler = async (ctx, next) => {
  let { name, password } = ctx.request.body;
  //   console.log("aaa" + password.trim().length);
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
  if (result[0].length) {
    const error = new Error(Error_information.yizhuce);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};
module.exports = errorHandler;
