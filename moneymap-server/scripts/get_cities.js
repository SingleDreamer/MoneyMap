const numbeo = require('../services/numbeo');

numbeo.getCitiesData().then(function(res) {
  for(i in res) {
    if(i < 99) {
      console.log(res[i]);
    }
  }
});
