const numbeo = require('../services/numbeo');
//const CityService = require('../services/cities');
const ItemService = require('../services/items');

// const args = process.argv;
//
// if(args.length == 2) {
//   console.log("Missing arguments");
//   return;
// }

numbeo.getItemData().then(function(res) {
  let body = JSON.parse(res);
  for(i in body.items) {
    let item = body.items[i];
    ItemService.create(item.item_id, item.rent_factor, item.cpi_factor, item.name, item.category);
  }
  console.log("Done");
});

// numbeo.getItemPriceData(args[2]).then(function(res) {
//
// });
