const sql = require("mssql")
var db = require("../services/db")

const CityService = {};

CityService.get = async (name) => {
  const request = new sql.Request(db);
  if(name != null) {
    request.input('CityName', sql.Text, name);
  }

  let result = await request.execute('sp_get_cities');

  return result;
};

module.exports = CityService;
