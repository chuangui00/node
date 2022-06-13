const connection = require("../app/database");

class labelService {
  async create(labelName) {
    const statement = `
        INSERT INTO label(name) VALUE(?)
        `;
    const result = await connection.execute(statement, [labelName]);
    return result;
  }
  async labelQuery(name) {
    const statement = `
    SELECT * FROM label WHERE name = ?
    `;
    const [result] = await connection.execute(statement, [name]);
    console.log(result[0]);
    return result[0];
  }
  async moment_label(moment_id, label_id) {
    const statement = `
      SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?
      `;
    const [result] = await connection.execute(statement, [moment_id, label_id]);
    return result[0] ? true : false;
    //或者const result = await connection.execute(statement, [moment_id, label_id]);
    // return result[0].length ? true : false;
  }
  async Create_moment_label(moment_id, label_id) {
    const statement = `
    INSERT INTO moment_label(moment_id,label_id) VALUE (?,?)
    `;
    console.log(moment_id, label_id);
    const result = await connection.execute(statement, [moment_id, label_id]);
    return result;
  }
}

module.exports = new labelService();
