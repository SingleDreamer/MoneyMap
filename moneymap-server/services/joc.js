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

JOCService.addComponent = async (id, ctypeid, cdesc, camt, token) => {
  const saveComponentRequest = new sql.Request(db);
  saveComponentRequest.input('jocid', sql.Int, id);
  saveComponentRequest.input('ctypeid', sql.Int, ctypeid);
  saveComponentRequest.input('token', sql.UniqueIdentifier, token);
  
  // Get tax information
  if(ctypeid == 1) {
    
    let getUserTaxRequest = new sql.Request(db);

    getUserTaxRequest.input('jocid', sql.Int, id);
    getUserTaxRequest.input('token', sql.UniqueIdentifier, token);
    let result = await getUserTaxRequest.execute('sp_get_tax_info');
  
    let checkCityRequest = new sql.Request(db);
    checkCityRequest.input('cityid', sql.Int, result.recordset[0].CityID);

    let result2 = await checkCityRequest.execute('sp_get_city');
    
    let region = result2.recordset[0];
	  

    // Only calculate taxes if in US
    if(region.Country == "United States") {
  
      let state = region.City.substring(region.City.length - 2);

      let res = await request({
        method: "POST",
        url: "https://taxee.io/api/v2/calculate/2019",
        headers: {
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVjZDEyMTRkNGU5ZjIxNTMzNDQyZjBmOCIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU1NzIwOTQyMX0.R1PxmgK0t8Z9UCHJsIGVdtb8pzofaCC2H_I3wWhqbvU",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
          "state": state,
          "filing_status": result.recordset[0].filing_status,
          "pay_rate": camt,
          "exemptions": result.recordset[0].exemptions
        }
      });
      
      let taxes = JSON.parse(res).annual;
      const saveTaxRequestFederal = new sql.Request(db);
      saveTaxRequestFederal.input('jocid', sql.Int, id);
      saveTaxRequestFederal.input('ctypeid', sql.Int,6);
      saveTaxRequestFederal.input('token', sql.UniqueIdentifier, token);
      saveTaxRequestFederal.input('camt', sql.Int, taxes.federal.amount);
      await saveTaxRequestFederal.execute('sp_add_joc_component');
      const saveTaxRequestFica = new sql.Request(db);
      saveTaxRequestFica.input('jocid', sql.Int, id);
      saveTaxRequestFica.input('ctypeid', sql.Int,7);
      saveTaxRequestFica.input('token', sql.UniqueIdentifier, token);
      saveTaxRequestFica.input('camt', sql.Int, taxes.fica.amount);
      await saveTaxRequestFica.execute('sp_add_joc_component');

      let totalTaxAmount = taxes.fica.amount + taxes.federal.amount;
      if(taxes.state.amount != null) {
        totalTaxAmount += taxes.state.amount;
	const saveTaxRequestState = new sql.Request(db);
        saveTaxRequestState.input('jocid', sql.Int, id);
        saveTaxRequestState.input('ctypeid', sql.Int,8);
        saveTaxRequestState.input('token', sql.UniqueIdentifier, token);
        saveTaxRequestState.input('camt', sql.Int, taxes.state.amount);
        await saveTaxRequestState.execute('sp_add_joc_component');
      }
      
      const savePretaxRequest = new sql.Request(db);
      savePretaxRequest.input('jocid', sql.Int, id);
      savePretaxRequest.input('ctypeid', sql.Int, 0);
      savePretaxRequest.input('token', sql.UniqueIdentifier, token);

      savePretaxRequest.input('camt', sql.Int, camt);

      await savePretaxRequest.execute('sp_add_joc_component');

      camt -= totalTaxAmount;
      cdesc = null;
    }
  }

  saveComponentRequest.input('camt', sql.Int, camt);
  if(cdesc != null) {
    saveComponentRequest.input('cdesc', sql.VarChar, cdesc);
  }

  let result = await saveComponentRequest.execute('sp_add_joc_component');

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
