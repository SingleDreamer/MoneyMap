const sql = require("mssql")
var db = require("../services/db")

const JOCService = {};

JOCService.create = async (uid, name, cityid, image, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, uid);
  request.input('name', sql.VarChar, name);
  request.input('cityid', sql.Int, cityid);
  request.input('token', sql.UniqueIdentifier, token);
  if(image != null) {
    request.input('image', sql.VarChar, image);
  }

  let result = await request.execute('sp_create_joc');

  return result.recordset[0];
};

JOCService.delete = async (id, token) => {
  const request = new sql.Request(db);
  request.input('cardid', sql.Int, id);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_delete_joc');

  return result;
};

JOCService.deleteComponents = async (id, token) => {
  const request = new sql.Request(db);
  request.input('jocid', sql.Int, id);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_delete_joc_components');

  return result;
};

JOCService.update = async (id, name, cityid, image, token) => {
  const request = new sql.Request(db);
  request.input('jocid', sql.Int, id);
  request.input('name', sql.VarChar, name);
  request.input('cityid', sql.Int, cityid);
  request.input('token', sql.UniqueIdentifier, token);
  if(image != null) {
    request.input('image', sql.VarChar, image);
  }

  let result = await request.execute('sp_update_joc');

  return result.recordset[0];
};

JOCService.addComponent = async (id, ctypid, cdesc, camt, token) => {
  const request = new sql.Request(db);
  request.input('jocid', sql.Int, id);
  request.input('ctypeid', sql.Int, ctypid);
  request.input('camt', sql.Int, camt);
  if(cdesc != null) {
    request.input('cdesc', sql.VarChar, cdesc);
  }
  request.input('token', sql.UniqueIdentifier, token);
  let result = await request.execute('sp_add_joc_component');
  const request2 = new sql.Request(db);
  request2.input('token', sql.UniqueIdentifier, token);
  request2.input('CardID', sql.Int, id);
  await request2.execute('sp_update_rfs');
  return result;
};

JOCService.getComponents = async (id, token) => {
  const request = new sql.Request(db);
  request.input('jocid', sql.Int, id);
  request.input('token', sql.UniqueIdentifier, token);
  let result = await request.execute('sp_get_components');

  return result;
};

JOCService.getComponentTypes = async (id, token) => {
  const request = new sql.Request(db);
  request.input('token', sql.UniqueIdentifier, token);
  let result = await request.execute('sp_get_componenttypes');

  return result;
};

module.exports = JOCService;
