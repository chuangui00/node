const {
  headPicture,
  uploadPictures,
} = require("../middleware/file.moddleware");
const { isToken } = require("../middleware/auth.moddleware");
const {
  createAvatar,
  getHeadPicture,
  createPictures,
  headPictureSize,
} = require("../controller/file.controller");
const Router = require("koa-router");
const fileRouter = Router({ prefix: "/onload" });
fileRouter.post(
  "/headPicture",
  isToken,
  headPicture,
  headPictureSize,
  createAvatar
);
fileRouter.get("/getHeadPicture/:userId/(.*)", getHeadPicture);
fileRouter.post("/pictures", isToken, uploadPictures, createPictures);

module.exports = fileRouter;
