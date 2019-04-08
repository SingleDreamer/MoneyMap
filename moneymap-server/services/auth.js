const AuthService = {};

AuthService.privateKey = "atestprivatekey";

AuthService.checkToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if(token != null) {
    req.params.token = token;
    return next();
  }

  return res.sendStatus(401);
};

module.exports = AuthService;
