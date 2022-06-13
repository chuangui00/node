const Router = require("koa-router");
const labelRouter = Router();
const { isToken } = require("../middleware/auth.moddleware");
const { create } = require("../controller/label.controller");

labelRouter.post("/labelCreate", isToken, create);

module.exports = labelRouter;
