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

ItemService.createPrice = async (cityid, itemid, lowestPrice, averagePrice, highestPrice) => {
  const request = new sql.Request(db);
  request.input('cityid', sql.Int, cityid);
  request.input('itemid', sql.Int, itemid);
  if(null != lowestPrice) {
    request.input('lowestprice', sql.Money, lowestPrice);
  }
  if(null != averagePrice) {
    request.input('averageprice', sql.Money, averagePrice);
  }
  if(null != highestPrice) {
    request.input('highestprice', sql.Money, highestPrice);
  }

  let result = await request.execute('sp_add_item_price');

  return result;
};

module.exports = ItemService;
