var express = require('express');
var router = express.Router();

const CityService = require('../services/cities');

router.get('/', async (req, res, next) => {
  let result = await CityService.get(null);
  res.json(result);
});

router.get('/:name', async (req, res, next) => {
  let result = await CityService.get(req.params.name);
  res.json(result);
});

module.exports = router;
