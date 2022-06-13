const service = require("../service/user.service");
const Md5 = require("../util/md5");
class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    ctx.request.body.password = Md5(ctx.request.body.password);

    const result = await service.create(user);
    console.log(result[0]);
    ctx.body = result[0];
  }
}

module.exports = new UserController();
