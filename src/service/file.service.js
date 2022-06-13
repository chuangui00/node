const connection = require("../app/database");

class fileService {
  async createAvatar(filename, mimetype, size, id, destination) {
    const statement = `
    INSERT INTO avatar (filename,mimetype,size,user_id,destination) VALUE (?,?,?,?,?)
    `;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      id,
      destination,
    ]);
    return result;
  }
  async getHeadPicture(userId) {
    const statement = `
    SELECT * FROM avatar WHERE user_id = ?
    `;
    console.log(userId);
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }
  async createPictures(momentId, filename, mimetype, size, destination, id) {
    console.log(momentId, filename, mimetype, size, destination, id);
    const statement = `
    INSERT INTO pictures (filename,mimetype,size,user_id,moment_id,destination) VALUE (?,?,?,?,?,?)
    `;
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      id,
      momentId,
      destination,
    ]);
    return result;
  }
}

module.exports = new fileService();
