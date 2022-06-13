const connection = require("../app/database");

class content {
  async add(id, value) {
    const statement = `INSERT INTO moment(users_id,content) VALUE(?,?)`;
    const result = await connection.execute(statement, [id, value]);
    return result;
  }
  async search(id) {
    console.log("aaaa", id);
    const statement = `
    SELECT 
    m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT("id",u.id,"name",u.name) auth,
    JSON_ARRAYAGG(
    JSON_OBJECT("id",c.id,"content",c.content,"commentId",c.comment_id,"createTime",c.createAt,"user",JSON_OBJECT("id",cu.id,"name",cu.name))) comment
      FROM 
    moment m 
    LEFT JOIN users u  
    ON m.users_id = u.id 
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN users cu ON c.users_id = cu.id
    WHERE m.id = 3
      `;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  async searchs(id, num) {
    const statement = `
      SELECT 
      m.id,m.content,m.createAt,m.updateAt,JSON_OBJECT("id",u.id,"name",u.name) auth,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
        FROM moment m LEFT JOIN users u 
      ON m.users_id = u.id 
      LIMIT ?,?
      `;
    const result = await connection.execute(statement, [id, num]);

    return result[0];
  }
  async remove(momentId) {
    const statement = `
    DELETE FROM moment WHERE id = ?`;
    const result = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new content();
