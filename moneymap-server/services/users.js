const jwt = require("jsonwebtoken")
const sql = require("mssql")
var db = require("../services/db")

const UserService = {};

const AuthService = require('../services/auth');

UserService.create = async (username, password) => {
  const request = new sql.Request(db);

  request.input('username', sql.Text, username);
  request.input('password', sql.Text, password);

  let result = await request.execute('sp_create_user');

  if(result.recordsets[0].length == 0) {
    return {
      status: "error",
      message: "There was an error creating the user"
    };
  }

  return {
    status: "success",
    uid: result.recordset[0].UID
  };
}

UserService.get = async (username, password) => {
  const request = new sql.Request(db);
  request.input('username', sql.Text, username);
  request.input('password', sql.Text, password);

  let result = await request.execute('sp_validate_user');

  let payload;

  if(result.recordsets[0].length == 0) {
    payload = {
      status: "error",
      message: "There was an error validating the user"
    };
  } else {
    payload = {
      status: "success",
      token: result.recordset[0].AuthToken
    };
  }

  return payload;
}

UserService.update = async (id, email, size, cardid, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('email', sql.Text, password);
  request.input('size', sql.Float, password);
  request.input('token', sql.UniqueIdentifier, token);
  if(cardid != null) {
    request.input('cardid', sql.UniqueIdentifier, password);
  }

  let result = await request.execute('sp_create_user_profile');

  return result;
}

UserService.getJOCs = async (id, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_jocs');
  var output = {
    "result": []
  };

  for(var row in result.recordset) {
    const comprequest = new sql.Request(db);
    comprequest.input('jocid', sql.Int, result.recordset[row].JobOfferCardID);
    let components = await comprequest.execute('sp_get_components');
    var comps = components.recordset;
    if(comps == null) {
      comps = [];
    }
    output.result.push({
      "jocid": result.recordset[row].JobOfferCardID,
      "jocname": result.recordset[row].JobOfferCardName,
      "jocrfc": result.recordset[row].RFS,
      "joccityid": result.recordset[row].CityID,
      "jocimage": result.recordset[row].CardImageSrc,
      "savings": result.recordset[row].savings,
      "components": comps
    });

  }

  return output;
};

module.exports = UserService;
