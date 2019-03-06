var express = require('express');
var router = express.Router();

const UserService = require('../services/users');

router.get('/:id/jocs', async (req, res, next) => {
  let result = await UserService.getJOCs(req.params.id);
  res.json(result);
});

module.exports = router;
