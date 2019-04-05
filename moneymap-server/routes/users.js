var express = require('express');
var router = express.Router();

const UserService = require('../services/users');
const AuthService = require('../services/auth');

router.get('/:id/jocs', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getJOCs(req.params.id, req.params.token);
  res.json(result);
});

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  let result = await UserService.create(username, password);
  res.json(result);
});

router.post('/:username/validate', async (req, res, next) => {
  const { password } = req.body;
  let result = await UserService.get(req.params.username, password);
  res.json(result);
});

router.post('/:id', [AuthService.checkToken], async (req, res, next) => {
  const { email, size, cardid } = req.body;
  let result = await UserService.update(req.params.id, email, size, cardid, req.params.token);
  res.json(result);
});

module.exports = router;
