const sql = require("mssql")
var db = require("../services/db")

const ItemService = {};

ItemService.create = async (itemid, rentfactor, cpifactor, name, category) => {
  const request = new sql.Request(db);
  request.input('itemid', sql.Int, itemid);
  request.input('rentfactor', sql.Float, rentfactor);
  request.input('cpifactor', sql.Float, cpifactor);
  request.input('name', sql.VarChar, name);
  request.input('category', sql.VarChar, category);

  let result = await request.execute('sp_add_item');

  return result;
};

module.exports = ItemService;
