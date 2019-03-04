const sql = require("mssql")
var db = require("../services/db")

const UserService = {};

UserService.getJOCs = async (id) => {
  const request = new sql.Request(db);
  request.input('uid', sql.Int, id);

  let result = await request.execute('sp_get_jocs');

  return result;
};

module.exports = UserService;
