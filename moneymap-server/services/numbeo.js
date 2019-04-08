const NumbeoService = {};

const baseUrl = "https://numbeo.com/api";
const key = "mig78v3toapc2s";

const request = require('request-promise');

NumbeoService.getCityData = async () => {
  return await request(constructApiUrl("/cities"));
};

NumbeoService.getItemData = async () => {
  return await request(constructApiUrl("/price_items"));
};

NumbeoService.getItemPriceData = async (cityid) => {
  return await request(constructApiUrl("/city_prices") + "&city_id=" + cityid);
};

function constructApiUrl(url) {
  return baseUrl + url + "?api_key=" + key;
}

module.exports = NumbeoService;
