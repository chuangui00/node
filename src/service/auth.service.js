const connection = require("../app/database");
class power {
  async power(momentId, id, idName) {
    console.log("验证是否有权限修改");
    const statement = `
    SELECT * FROM ${idName} WHERE id = ? AND users_id = ?
    `;
    try {
      const [result] = await connection.execute(statement, [
        momentId,
        id.toString(),
      ]);
      return [result][0].length === 0 ? false : true;
    } catch (error) {
      console.log("没有权限！");
      console.log(error);
    }
  }
  async powersT(content, momentId) {
    const statement = `
      UPDATE moment SET content = ? WHERE id = ?
      `;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
}

module.exports = new power();
