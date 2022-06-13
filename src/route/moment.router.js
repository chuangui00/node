const Router = require("koa-router");
const momentRouter = new Router();

const { isToken } = require("../middleware/auth.moddleware");
const {
  WordSuccess,
  getWords,
  wordLists,
  update,
  power,
  remove,
  addLabel,
} = require("../controller/moment.controller");
const { labelExists } = require("../middleware/label.moddleware");

momentRouter.post("/word", isToken, WordSuccess);
momentRouter.get("/getword/:id", getWords);
momentRouter.get("/wordlist", wordLists);
momentRouter.patch("/patch/:momentId", isToken, power, update);
momentRouter.delete("/remove/:momentId", isToken, power, remove);
momentRouter.post("/addLabel/:momentId", isToken, power, labelExists, addLabel);

module.exports = momentRouter;
