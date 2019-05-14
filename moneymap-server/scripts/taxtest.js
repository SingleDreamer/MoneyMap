const sql = require("mssql")
var db = require("../services/db")

const request = require('request-promise-native');

request("https://google.com").then(async function(unused) {
  const request = new sql.Request(db);
  // request.input('uid', sql.UniqueIdentifier, "599DAFEE-D337-4DC3-8F83-B932B4837AB6");
  // request.input('token', sql.UniqueIdentifier, "204EB0A8-1914-4CDE-8686-32A8D1C4230B");
  request.input('cityid', sql.Int, "10107");

  let result = await request.execute('sp_get_city');

  let region = result.recordset[0];

  console.log();

  request({
    method: "POST",
    url: "https://taxee.io/api/v2/calculate/2019",
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVjZDEyMTRkNGU5ZjIxNTMzNDQyZjBmOCIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU1NzIwOTQyMX0.R1PxmgK0t8Z9UCHJsIGVdtb8pzofaCC2H_I3wWhqbvU",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      "state": "NC",
      "filing_status": "married",
      "pay_periods": 26,
      "pay_rate": 116500,
      "exemptions": 2
    }
  }).then(function(res) {
    console.log(res);
  }).catch(function(err) {
    console.log(err);
  });

});
