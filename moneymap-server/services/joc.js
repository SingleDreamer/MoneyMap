const sql = require("mssql")
var db = require("../services/db")

const JOCService = {};

JOCService.create = async (uid, name, cityid, image) => {
    const request = new sql.Request(db);
    request.input('uid', sql.UniqueIdentifier, uid);
  request.input('name', sql.VarChar, name);
  request.input('cityid', sql.Int, cityid);
  if(image != null) {
    request.input('image', sql.VarChar, image);
  }

  let result = await request.execute('sp_create_joc');

  return result;
};

JOCService.addComponent = async (id, ctypid, cdesc, camt) => {
  const request = new sql.Request(db);
  request.input('jocid', sql.Int, id);
  request.input('ctypeid', sql.Int, id);
  request.input('camt', sql.Int, id);
  if(cdesc != null) {
    request.input('cdesc', sql.VarChar, cdesc);
  }
  let result = await request.execute('sp_add_joc_component');

  return result;
};

JOCService.getComponents = async (id) => {
  const request = new sql.Request(db);
  request.input('jocid', sql.Int, id);
  let result = await request.execute('sp_get_components');

  return result;
};

JOCService.getComponentTypes = async (id) => {
  const request = new sql.Request(db);
  let result = await request.execute('sp_get_componenttypes');

  return result;
};

module.exports = JOCService;
