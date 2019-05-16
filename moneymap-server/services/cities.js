const sql = require("mssql")
var db = require("../services/db")

const CityService = {};

CityService.create = async (cityid, latitude, longitude, country, name) => {
  const request = new sql.Request(db);
  request.input('CityID', sql.Int, cityid);
  request.input('Latitude', sql.Float, latitude);
  request.input('Longitude', sql.Float, longitude);
  request.input('Country', sql.VarChar, country);
  request.input('name', sql.VarChar, name);

  let result = await request.execute('sp_add_city');

  return {
    status: "success"
  };
};

CityService.get = async (name) => {
  const request = new sql.Request(db);
  if(name != null) {
    request.input('CityName', sql.Text, name);
  }

  let result = await request.execute('sp_get_cities');

  return {
    status: "success",
    "cities": result.recordset
  };
};

CityService.getById = async (id) => {
  const request = new sql.Request(db);
  request.input('cityid', sql.Int, id);

  let result = await request.execute('sp_get_city');

  return result;
};

CityService.getCityIds = async (type) => {
  const request = new sql.Request(db);
  request.input('type', sql.Int, type);

  let result = await request.execute('sp_get_city_ids');

  return result.recordset;
}

CityService.getAverages = async (id, uid, token) => {
  const request = new sql.Request(db);
  request.input('cityid', sql.Int, id);
  request.input('uid', sql.UniqueIdentifier, uid);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_averages');

  return result;
};

module.exports = CityService;
