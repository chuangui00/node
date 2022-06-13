const {
  create,
  reply,
  revise,
  remove,
  getComment,
} = require("../service/comment.service");
class comment {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    console.log(content, momentId, id);
    const result = await create(content, momentId, id);
    ctx.body = result;
  }
  async reply(ctx, next) {
    console.log("aaaa");
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    const { replyid } = ctx.request.params;
    console.log(content, momentId, id, replyid);
    //内容，文章id，作者id，追加评论的id
    const result = await reply(content, momentId, id, replyid);
    ctx.body = result;
  }
  async revise(ctx, next) {
    const { commentId } = ctx.request.params;
    const { content } = ctx.request.body;
    const result = await revise(commentId, content);
    ctx.body = result;
  }
  async remove(ctx, next) {
    const { commentId } = ctx.request.params;
    const result = await remove(commentId);
    ctx.body = result;
  }
  async getComment(ctx, next) {
    console.log("获取了评论信息");
    const { momentId } = ctx.request.params;
    const result = await getComment(momentId);
    ctx.body = result;
  }
}
module.exports = new comment();
