const error = require("../middleware/user.moddleware");
const Router = require("koa-router");
const Md5 = require("../util/md5");
const userRouter = new Router({ prefix: "/users" });
const { create } = require("../controller/user.controller");
userRouter.post("/", error, create);

module.exports = userRouter;
