const numbeo = require('../services/numbeo');
const CityService = require('../services/cities');

numbeo.getCityData().then(function(res) {
  let body = JSON.parse(res);
  for(i in body.cities) {
    let city = body.cities[i];
    CityService.create(city.city_id, city.latitude, city.longitude, city.country, city.city);
  }
  console.log("Done");
});
