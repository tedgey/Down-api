const db = require("./conn.js");

class Posts {
  constructor(id, group_name, texts, group_id, user_id) {
    this.id = id;
    this.group_name = group_name;
    this.texts = texts;
    this.group_id = group_id;
    this.user_id = user_id;
  }

  //select all groups that the user is in
  static async getUserGroups() {
    try {
      const response = await db.any(
        `select * from user_groups where user_id = ${user_id};`
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  //select all groups for testing purposes
  static async getAllGroups() {
    try {
      const response = await db.any(`select group_name from groups`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  //select username
  static async getUserName() {
    try {
      const response = await db.one(`select * from users where user_id = 2;`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  //select a specific group text
  static async getById(/* group_name*/) {
    try {
      const response = await db.any(
        `select * from messages where group_id = 1`
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  //delete a group
  static async removeGroup(id) {
    try {
      const response = await db.result(`delete from groups where id = ${id}`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  //create a new group chat
  static async createGroup(group_name, date_time) {
    const query = `INSERT INTO groups (group_name, date_time) VALUES ('${group_name}', '${date_time}')`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  //add a text in the group chat
  static async addText(texts) {
    const query = `INSERT INTO messages (texts) VALUES ('${texts}')`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Posts;
