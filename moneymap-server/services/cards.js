const sql = require("mssql")
var db = require("../services/db")

const CardService = {};

CardService.updateRfs = async (id) => {
  const request = new sql.Request(db);
  request.input('CardID', sql.Int, name);

  let result = await request.execute('sp_update_rfc');

  return result;
};

module.exports = CardService;
