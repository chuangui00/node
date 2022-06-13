const { add, search, searchs, remove } = require("../service/content.service");
const { power, powersT } = require("../service/auth.service");
const {
  moment_label,
  Create_moment_label,
} = require("../service/label.service");
class Moment {
  async WordSuccess(ctx, next) {
    console.log(ctx.user.id);
    const content = ctx.request.body.content;
    const result = await add(ctx.user.id, content);
    ctx.body = result;
  }
  async getWords(ctx, next) {
    console.log(ctx.request.params.id);
    const result = await search(ctx.params.id);
    ctx.body = result;
  }
  async wordLists(ctx, next) {
    const { id, num } = ctx.query;
    console.log(id, num);
    const result = await searchs(id, num);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { momentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const result = await powersT(content, momentId);
    ctx.body = result;
  }
  async remove(ctx, next) {
    const { momentId } = ctx.request.params;
    const result = await remove(momentId);
    ctx.body = result;
  }
  async power(ctx, next) {
    const idName = Object.keys(ctx.request.params)[0].replace("Id", "");
    const paramsId = Object.values(ctx.request.params)[0];
    const { id } = ctx.user;
    const result = await power(paramsId, id, idName);
    console.log("经过了权限验证!");
    if (!result) {
      return (ctx.body = "没有进行操作的权限！");
    }
    await next();
  }
  async addLabel(ctx, next) {
    const labels = ctx.labels;
    console.log("aaaaaaaaaaaa" + labels[labels.length - 1].id);
    const { momentId } = ctx.request.params;
    for (let label of labels) {
      console.log(label.id);
      const result = await moment_label(momentId, label.id);
      console.log(result);
      if (!result) {
        await Create_moment_label(momentId, label.id);
      }
    }
    ctx.body = "内容添加标签成功！";
  }
}

module.exports = new Moment();
