const jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const {
  createAvatar,
  getHeadPicture,
  createPictures,
} = require("../service/file.service");
class file {
  async createAvatar(ctx, next) {
    const { filename, mimetype, size, destination } = ctx.req.file;
    const { id } = ctx.user;
    const result = await createAvatar(
      filename,
      mimetype,
      size,
      id,
      destination
    );
    ctx.body = result;
  }
  async getHeadPicture(ctx, next) {
    const url = ctx.request.url.split("/");
    console.log(url[url.length - 1]);
    let a = ["small", "big"];
    let path = "";
    a.forEach((item) => {
      if (item === url[url.length - 1]) {
        path = "-" + url[url.length - 1];
      }
    });
    console.log(path);
    const { userId } = ctx.request.params;
    const result = await getHeadPicture(userId);
    ctx.response.set("Content-Type", result.mimetype);
    console.log(`${result.destination}/${result.filename}`);
    ctx.body = fs.createReadStream(
      `${result.destination}/${result.filename}${path}`
    );
  }
  async createPictures(ctx, next) {
    const { momentId } = ctx.request.query;
    const { id } = ctx.user;
    for (let name of ctx.req.files) {
      const { filename, mimetype, size, destination } = name;
      const result = await createPictures(
        momentId,
        filename,
        mimetype,
        size,
        destination,
        id
      );
    }
    ctx.body = "文件上传成功";
  }
  async headPictureSize(ctx, next) {
    const file = ctx.req.file;
    const imgPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then((image) => {
      image.resize(1280, jimp.AUTO).write(imgPath + "-big");
      image.resize(640, jimp.AUTO).write(imgPath + "-small");
    });
    await next();
  }
}
module.exports = new file();
