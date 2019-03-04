var express = require('express');
var router = express.Router();

const CardService = require('../services/cards');

router.put('/:id/rfc', async (req, res, next) => {
  let result = await CardService.updateRfc(req.params.id);
  res.json(result);
});

module.exports = router;
