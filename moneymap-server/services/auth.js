const jwt = require('jsonwebtoken');

const AuthService = {};

AuthService.privateKey = "atestprivatekey";

AuthService.checkToken = async (req, res, next) => {
  let token = req.headers["Authorization"];
  if(token != null) {
    var decoded = jwt.verify(token, AuthService.privateKey);
    console.log(decoded);
  }

  return res.sendStatus(401);
};

module.exports = AuthService;
