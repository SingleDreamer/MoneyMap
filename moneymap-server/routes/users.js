var express = require('express');
var router = express.Router();

const UserService = require('../services/users');
const AuthService = require('../services/auth');

router.get('/:id/jocs', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getJOCs(req.params.id, req.params.token);
  res.json(result);
});

/*
  Create user
  Takes in JSON with following format:
  {
  	"username": "user35",
  	"password": "pass",
  	"fname": "User",
  	"lname": "User",
  	"adults": 2,
  	"children": 1,
  	"married": 1
  }

  If successful, returns uid of newly created user and authentication token
*/
router.post('/', async (req, res, next) => {
  const { username, password, fname, lname, adults, children, married } = req.body;
	console.log(req.body);
  let result = await UserService.create(username, password, fname, lname, adults, children, married);
  res.json(result);
});

/*
  Get user authentication token
  Takes in JSON with following format:
  {
  	"username": "user35",
  	"password": "pass"
  }

  If successful, returns nothing
*/
router.post('/validate', async (req, res, next) => {
  const { username, password } = req.body;
  let result = await UserService.get(username, password);
  res.json(result);
});

router.post('/:id', [AuthService.checkToken], async (req, res, next) => {
  const { email, fname, lname, adults, children, married, cardid } = req.body;
  let result = await UserService.update(req.params.id, email, fname, lname, adults, children, married, cardid, req.params.token);
  res.json(result);
});

/*
  Get user profile values

  If successful, returns profile in the following format:
  {
    "status": "success",
    "profile": {
        "FirstName": "User",
        "LastName": "User",
        "Adults": 2,
        "Children": 1,
        "MaritalStatus": "1"
    }
  }
*/
router.get('/:id/profile', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getProfile(req.params.id, req.params.token);
  res.json(result);
});

/*
  Get user authentication token
  Takes in JSON with following format:
  {
  	"username": "user35",
  	"fname": "User",
  	"lname": "User",
  	"adults": 2,
  	"children": 1,
  	"married": 1
  }

  If successful, returns uid of newly created user and authentication token
*/
router.post('/:id/profile', [AuthService.checkToken], async (req, res, next) => {
  const { fname, lname, adults, children, married } = req.body;
  let result = await UserService.updateProfile(req.params.id, fname, lname, adults, children, married, req.params.token);
  res.json(result);
});

/*
  Get user items

  If successful, returns items in the following format:
  {
    "status": "success",
    "items": [
        {
            "Rent_Factor": 0,
            "Cpi_Factor": 0,
            "Item_ID": 105,
            "Name": "Average Monthly Net Salary (After Tax)",
            "Category": "Salaries And Financing",
            "Type": 1,
            "ComponentTypeDescription": "Net Income"
        },
        ...
    ]
  }
*/
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
  let result = await UserService.getCityPreferences(req.params.id, req.params.cid, req.params.token);
  res.json(result);
});

router.get('/:id/preferences/costs/:cid', [AuthService.checkToken], async (req, res, next) => {
  let result = await UserService.getCityCosts(req.params.id, req.params.cid, req.params.token);
  res.json(result);
});

module.exports = router;
