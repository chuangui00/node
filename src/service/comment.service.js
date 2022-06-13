const connection = require("../app/database");
class commentService {
  async create(content, momentId, usersId) {
    const statement = `
      INSERT INTO comment (content,moment_id,users_id) VALUE (?,?,?)
      `;
    const result = await connection.execute(statement, [
      content,
      momentId,
      usersId,
    ]);
    console.log("aaaa" + result);
    return result;
  }
  async reply(content, moment_id, id, replyid) {
    const statement = `
      INSERT INTO comment (content,moment_id,users_id,comment_id) VALUE (?,?,?,?)
      `;
    const result = await connection.execute(statement, [
      content,
      moment_id,
      id,
      replyid,
    ]);
    return result;
  }
  async revise(revise, content) {
    const statement = `
    UPDATE comment SET content = ? WHERE id = ?`;
    const result = await connection.execute(statement, [content, revise]);
    return result;
  }
  async remove(commentId) {
    const statement = `
    DELETE FROM comment WHERE id = ?`;
    const result = connection.execute(statement, [commentId]);
    return result;
  }
  async getComment(momentId) {
    const statement = `
    SELECT c.id,c.content,c.moment_id,c.users_id,c.comment_id,c.createAt ,JSON_OBJECT("id",u.id,"name",u.name) user
FROM comment c  LEFT JOIN users u ON c.users_id = u.id
 WHERE moment_id = 3
    `;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
}
module.exports = new commentService();
