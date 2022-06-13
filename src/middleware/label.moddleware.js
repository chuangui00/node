const { labelQuery, create } = require("../service/label.service");
class label {
  async labelExists(ctx, next) {
    const { labels } = ctx.request.body;
    let labelArray = [];
    for (let name of labels) {
      const result = await labelQuery(name);
      if (!result) {
        const result = create(name);
        labelArray.push({ id: result.insertId, name });
      } else {
        labelArray.push({ id: result.id, name });
      }
    }
    ctx.labels = labelArray;
    await next();
  }
}

module.exports = new label();
