const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class AuthCOntroller {
  async auth(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = { id, name, token };
  }
  async success(ctx) {
    ctx.body = "text token有效";
  }
}

module.exports = new AuthCOntroller();
