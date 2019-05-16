const sql = require("mssql")
var db = require("../services/db")

const request = require('request-promise-native');

request("https://google.com").then(async function(unused) {
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
      console.log(totalTaxAmount);
    }).catch(function(err) {
      console.log(err);
    });
  }



});
