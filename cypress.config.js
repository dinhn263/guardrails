const { defineConfig } = require("cypress");



module.exports = defineConfig({
  e2e: {
    baseUrl: "https://juice-shop.guardrails.ai/",
    email: 'dinh.java1111@gmail.com',
    password: 'Qwerty123!',
    uri: {
      uri_login: 'rest/user/login',
      uri_search_product: 'rest/products/search?q=',
      uri_basket: 'rest/basket/',
      uri_basket_item: 'api/BasketItems/',
      uri_product_quantity: 'api/Quantitys/',
      uri_address: 'api/Addresss/'
    },
    defaultCommandTimeout: 30000,
  },
});
