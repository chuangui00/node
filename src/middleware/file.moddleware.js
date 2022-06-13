const multer = require("koa-multer");
const upload = multer({ dest: "uploads/avatar" });
const headPicture = upload.single("headPicture");

const pictures = multer({ dest: "uploads/pictures" });
const uploadPictures = pictures.array("pictures", 10);

module.exports = {
  headPicture,
  uploadPictures,
};
