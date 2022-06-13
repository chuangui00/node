const router = require("koa-router");
const commentRouter = router();
const { isToken } = require("../middleware/auth.moddleware");
const { power } = require("../controller/moment.controller");
const {
  create,
  reply,
  revise,
  remove,
  getComment,
} = require("../controller/comment.controller.js");
commentRouter.post("/create", isToken, create);
commentRouter.post("/:replyid/reply", isToken, reply);
commentRouter.patch("/:commentId/revise", isToken, power, revise);
commentRouter.delete("/:commentId/remove", isToken, power, remove);
commentRouter.get("/getComment/:momentId", getComment);

module.exports = commentRouter;
