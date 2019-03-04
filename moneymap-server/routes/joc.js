var express = require('express');
var router = express.Router();

const JOCService = require('../services/joc');

router.post('/', async (req, res, next) => {
  const { uid, name, cityid, image } = req.body;

  let result = await JOCService.create(uid, name, cityid, image);
  res.json(result);
});

router.post('/:id', async (req, res, next) => {
  const { ctype, cdesc, camt } = req.body;

  let result = await JOCService.addComponent(ctype, cdesc, camt);
  res.json(result);
});

router.get('/types', async (req, res, next) => {
  let result = await JOCService.getComponentTypes();
  res.json(result);
});

router.get('/:id', async (req, res, next) => {
  let result = await JOCService.getComponents(req.params.id);
  res.json(result);
});

module.exports = router;
