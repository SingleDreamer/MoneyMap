var express = require('express');
var router = express.Router();

const UserService = require('../services/users');
const AuthService = require('../services/auth');

router.get('/:id/jocs', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getJOCs(req.params.id, req.params.token);
  res.json(result);
});

router.post('/', async (req, res, next) => {
  const { username, password, fname, lname, size } = req.body;
  let result = await UserService.create(username, password, fname, lname, size);
  res.json(result);
});

router.post('/validate', async (req, res, next) => {
  const { username, password } = req.body;
  let result = await UserService.get(username, password);
  res.json(result);
});

router.post('/:id', [AuthService.checkToken], async (req, res, next) => {
  const { email, fname, lname, size, cardid } = req.body;
  let result = await UserService.update(req.params.id, email, fname, lname, size, cardid, req.params.token);
  res.json(result);
});

router.get('/:id/profile', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getProfile(req.params.id, req.params.token);
  res.json(result);
});

router.get('/:id/items', async (req, res, next) => {
  let result = await UserService.getItems();
  res.json(result);
});

router.get('/:id/preferences', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getPreferences(req.params.id, req.params.token);
  res.json(result);
});

router.post('/:id/preferences', [AuthService.checkToken], async (req, res, next) => {
  let results = [];
  for(i in req.body) {
    let preference = req.body[i];
    let result = await UserService.createPreference(req.params.id, preference.itemid, preference.amount, req.params.token);
    results.push(result);
  }

  res.json(results);
});

router.get('/:id/preferences/city/:cid', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getCityPreferences(req.params.id, req.params.token);
  res.json(result);
});

router.get('/:id/preferences/costs/:cid', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getCityCosts(req.params.id, req.params.token);
  res.json(result);
});

module.exports = router;
