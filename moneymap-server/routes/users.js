var express = require('express');
var router = express.Router();

const UserService = require('../services/users');

router.get('/:id/jocs', async (req, res, next) => {
  let result = await UserService.getJOCs(req.params.id);
  res.json(result);
});

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  let result = await UserService.create(username, password);
  res.json(result);
});

router.post('/:username', async (req, res, next) => {
  const { password } = req.body;
  let result = await UserService.get(req.params.username, password);
  res.json(result);
});

router.post('/:id', async (req, res, next) => {
  const { email, size, cardid } = req.body;
  let result = await UserService.update(req.params.id, email, size, cardid);
  res.json(result);
});

module.exports = router;
