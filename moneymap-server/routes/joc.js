var express = require('express');
var router = express.Router();

const JOCService = require('../services/joc');
const AuthService = require('../services/auth');

router.post('/', async (req, res, next) => {
  const { uid, name, cityid, image } = req.body;

  let result = await JOCService.create(uid, name, cityid, image);
  res.json(result);
});

router.post('/:id', async (req, res, next) => {
  let results = [];

  for(i in req.body) {
    let component = req.body[i];
    let result = await JOCService.addComponent(req.params.id, component.ctype, component.cdesc, component.camt);
    results.push(result);
  }

  res.json(results);
});

router.get('/types', async (req, res, next) => {
  let result = await JOCService.getComponentTypes();
  res.json(result);
});

router.get('/:id', async (req, res, next) => {
  let result = await JOCService.getComponents(req.params.id);
  res.json(result);
});

router.delete('/:id', [AuthService.checkToken], async (req, res, next) => {
  let result = await JOCService.delete(req.params.id);
  res.json(result);
});

module.exports = router;
