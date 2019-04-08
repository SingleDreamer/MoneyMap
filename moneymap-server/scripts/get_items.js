const numbeo = require('../services/numbeo');
const ItemService = require('../services/items');
const CityService = require('../services/cities');

const args = process.argv;

if(args.length == 2) {
  console.log("Missing arguments");
  return;
}

numbeo.getItemData().then(async function(res) {
  let body = JSON.parse(res);
  for(i in body.items) {
    let item = body.items[i];
    ItemService.create(item.item_id, item.rent_factor, item.cpi_factor, item.name, item.category);
  }

  let type = parseInt(args[2]);

  let cityIds = await CityService.getCityIds(type);
  var result = [];
  for(i in cityIds) {
    let cityId = cityIds[i].CityID;

    let prices = JSON.parse(await numbeo.getItemPriceData(cityId)).prices;
    for(i in prices) {
      let price = prices[i];
      result.push(ItemService.createPrice(cityId, price.item_id, price.lowest_price, price.average_price, price.highest_price));
    }
  }
  await Promise.all(result);

  console.log("Done");

  process.exit();
});
