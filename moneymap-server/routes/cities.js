var express = require('express');
var router = express.Router();

const CityService = require('../services/cities');
const AuthService = require('../services/auth');

router.get('/', async (req, res, next) => {
  let result = await CityService.get(null);
  res.json(result);
});

router.get('/:name', async (req, res, next) => {
  let result = await CityService.get(req.params.name);
  res.json(result);
});

router.get('/:id/averages/:uid', [AuthService.checkToken], async (req, res, next) => {
  let result = await CityService.getAverages(req.params.id, req.params.uid, req.params.token);
  res.json(result);
});

module.exports = router;
