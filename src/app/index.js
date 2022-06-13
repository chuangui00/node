const Koa = require("koa");
const KoaBody = require("koa-body");
require("../app/database");
const router = require("../route/index");

const app = new Koa();

app.use(KoaBody()); //在前面，这样路由才能用到解析模块
router(app);
app.on("error", function (error, ctx) {
  console.log(error.message);
  return (ctx.body = error.message);
});
module.exports = app;
