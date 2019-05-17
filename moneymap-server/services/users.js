const sql = require("mssql")
var db = require("../services/db")

const UserService = {};

function isAuthFailure(recordset) {
  if(recordset != undefined)
	{if(recordset[0] != undefined && recordset[0].hasOwnProperty('AuthFailed')) {
    return true;
  }}

  return false;
}

UserService.create = async (username, password, fname, lname, adults, children, married) => {
  const request = new sql.Request(db);

  request.input('username', sql.VarChar, username);
  request.input('password', sql.VarChar, password);
  request.input('fname', sql.VarChar, fname);
  request.input('lname', sql.VarChar, lname);
  request.input('adults', sql.Int, adults);
  request.input('children', sql.Int, children);
  request.input('married', sql.VarChar, married);

  let result = await request.execute('sp_create_user');

  if(result.recordsets[0].length == 0) {
    return {
      status: "error",
      message: "There was an error creating the user"
    };
  }

  return {
    status: "success",
    uid: result.recordset[0].UID,
    token: result.recordset[0].AuthToken
  };
}

UserService.get = async (username, password) => {
  const request = new sql.Request(db);
  request.input('username', sql.VarChar, username);
  request.input('password', sql.VarChar, password);

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
      uid: result.recordset[0].UID,
      token: result.recordset[0].AuthToken
    };
  }
  return payload;
}

UserService.update = async (id, email, fname, lname, adults, children, married, cardid, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('email', sql.Text, email);
  request.input('fname', sql.Text, fname);
  request.input('lname', sql.Text, lname);
  request.input('adults', sql.Int, adults);
  request.input('children', sql.Int, children);
  request.input('married', sql.VarChar, married);
  request.input('token', sql.UniqueIdentifier, token);
  if(cardid != null) {
    request.input('cardid', sql.UniqueIdentifier, password);
  }

  let result = await request.execute('sp_create_userprofile');

  return result;
}

UserService.updateProfile = async (id, fname, lname, adults, children, married, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('fname', sql.Text, fname);
  request.input('lname', sql.Text, lname);
  request.input('adults', sql.Int, adults);
  request.input('children', sql.Int, children);
  request.input('married', sql.VarChar, married);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_update_user_profile');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  return {
    status: "success"
  };
}

UserService.getJOCs = async (id, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_jocs');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  var output = {
    "result": []
  };

  for(var row in result.recordset) {
    const comprequest = new sql.Request(db);
    comprequest.input('token', sql.UniqueIdentifier, token);
    comprequest.input('jocid', sql.Int, result.recordset[row].JobOfferCardID);
    let components = await comprequest.execute('sp_get_components');
    var comps = components.recordset;
    if(comps == null) {
      comps = [];
      }
      const cityrequest = new sql.Request(db);
      cityrequest.input('cityid', sql.Int, result.recordset[row].CityID);
      let city = await cityrequest.execute('sp_get_city');
    output.result.push({
      "jocid": result.recordset[row].JobOfferCardID,
      "jocname": result.recordset[row].JobOfferCardName,
      "priority": result.recordset[row].Priority,
      "jocrfc": result.recordset[row].RFS,
      "joccityid": result.recordset[row].CityID,
      "jocimage": result.recordset[row].CardImageSrc,
      "savings": result.recordset[row].savings,
      "components": comps,
      "city": city.recordset[0]
    });

  }

  return output;
};

UserService.getItems = async () => {
  const request = new sql.Request(db);

  let result = await request.execute('sp_get_items');
  return result;
};

UserService.getProfile = async (id, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_profile');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  return result;
};

UserService.getPreferences = async (id, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_user_preferences');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  return result;
};

UserService.createPreference = async (id, iid, amount, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('itemid', sql.Int, iid);
  request.input('amount', sql.Int, amount);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_add_user_preference');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  return {
    status: "success"
  };
};

UserService.getCityPreferences = async (id, cid, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('cityid', sql.Int, cid);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_user_city_preferences');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  return result;
};

UserService.getCityCosts = async (id, cid, token) => {
  const request = new sql.Request(db);
  request.input('uid', sql.UniqueIdentifier, id);
  request.input('cityid', sql.Int, cid);
  request.input('token', sql.UniqueIdentifier, token);

  let result = await request.execute('sp_get_user_city_costs');

  if(isAuthFailure(result.recordset)) {
    return {
      status: "error",
      message: "Invalid auth token"
    };
  }

  return result;
};

module.exports = UserService;
