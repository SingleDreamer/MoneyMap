const numbeo = require('../services/numbeo');
const ItemService = require('../services/items');

numbeo.getItemData().then(function(res) {
  let body = JSON.parse(res);
  for(i in body.items) {
    let item = body.items[i];
    ItemService.create(item.item_id, item.rent_factor, item.cpi_factor, item.name, item.category);
  }
  console.log("Done");
});
