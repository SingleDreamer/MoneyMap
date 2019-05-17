const sql = require("mssql")
var db = require("../services/db")

const request = require('request-promise-native');

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
  if(cdesc != null) {
    request.input('cdesc', sql.VarChar, cdesc);
  }
  request.input('token', sql.UniqueIdentifier, token);

  // Get tax information
  if(ctypeid == 1) {
    let dbrequest = new sql.Request(db);
    dbrequest.input('cityid', sql.Int, "10107");

    let result = await dbrequest.execute('sp_get_city');

    let region = result.recordset[0];

    // Only calculate taxes if in US
    if(region.Country == "United States") {
      let state = region.City.substring(region.City.length - 2);

      let dbrequest = new sql.Request(db);

      dbrequest.input('uid', sql.UniqueIdentifier, "67E2CD40-1D16-43A2-B0DE-0E0C67598AF0");
      dbrequest.input('token', sql.UniqueIdentifier, "BC7679DA-F682-4897-8BEF-3A9258DC1442");

      let result = await dbrequest.execute('sp_get_tax_info');

      request({
        method: "POST",
        url: "https://taxee.io/api/v2/calculate/2019",
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVjZDEyMTRkNGU5ZjIxNTMzNDQyZjBmOCIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU1NzIwOTQyMX0.R1PxmgK0t8Z9UCHJsIGVdtb8pzofaCC2H_I3wWhqbvU",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
          "state": state,
          "filing_status": result.recordset[0].filing_status,
          "pay_rate": 116500,
          "exemptions": result.recordset[0].exemptions
        }
      }).then(function(res) {
        let taxes = JSON.parse(res).annual;

        let totalTaxAmount = taxes.fica.amount + taxes.federal.amount;
        if(taxes.state.amount != null) {
          totalTaxAmount += taxes.state.amount;
        }

        camt -= totalTaxAmount;
      }).catch(function(err) {
        console.log(err);
      });
    }
  }

  request.input('camt', sql.Int, camt);

  let result = await request.execute('sp_add_joc_component');

  return result;
};

JOCService.updateRFS = async (id, token) => {
  const request = new sql.Request(db);
  request.input('CardID', sql.Int, id);
  request.input('token', sql.UniqueIdentifier, token);
  let result = await request.execute('sp_update_rfs');
  return result
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
