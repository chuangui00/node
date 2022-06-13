const app = require("./app/index");
const config = require("./app/config");

app.listen(config.APP_POST, () => {
  console.log(`启动成功！端口号为${config.APP_POST}`);
});
