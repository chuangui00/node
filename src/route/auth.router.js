const Router = require("koa-router");
const { login, isToken } = require("../middleware/auth.moddleware");
const { auth, success } = require("../controller/auth.controller");
const authRouter = new Router();
authRouter.post("/login", login, auth);
authRouter.get("/text", isToken, success);
module.exports = authRouter;
