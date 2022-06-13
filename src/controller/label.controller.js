const { create } = require("../service/label.service");

class labelController {
  async create(ctx, next) {
    const { labelName } = ctx.request.body;
    const result = await create(labelName);
    ctx.body = result;
  }
}

module.exports = new labelController();
