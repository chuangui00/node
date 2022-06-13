const fs = require("fs");

const useRouter = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    //读取文件夹
    if (file === "index.js") return;
    let router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods()); //判断请求是否能够处理
  });
};

module.exports = useRouter;
