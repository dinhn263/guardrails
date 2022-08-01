import {generateUniqueNumbers} from '../../support/utils'


var basket_id = '';               // need to store the basket id of user. 
var token = '';                   // token value, get token, after login
var list_product_quantity = [];   // get list product which quantity > 0

/**
 * This test case is used for validating removing item from basket.
 * Pre-conditions:
 *    + step 1: we have to login via api to get token and basket id of user. These values are global variables.
 *    + step 2: after have token, basket id on step 1, we will send api to get existing basket.
 *              check basket has any existing items then we remove all items.
 *    + step 3: we send request to get list product with quantity and store in variable: "list_product_quantity"
 * 
 * Steps:
 *    + step 1: we will generate 2 unique numbers (in range of list_product_quantity'lengths)
 *              these unique numbers indicate the index of product of array 'list_product_quantity'.
 *              after get 2 unique numbers, we will get 2 unique product id from array 'list_product_quantity'.
 *    + step 2: create an object 'item_added' to store value of item/product we will add to basket.
 *    + step 3: for each item in object 'item_added', we will send request to add item to basket.
 *    + step 4: make get request to check basket detail to check if items on step 3 added successfully.
 *    + step 5: make get request to remove second item from basket. 
 *    + step 6: make get requst to check basket on have 1 item because we already remove 1 item from step 5.
 * 
* */
context('Delete item in basket via api', () => {
  // get email and password from config file: e2e/*.config.js
  var email = Cypress.config().email;
  var password = Cypress.config().password;

  beforeEach(()=>{
    // make reques to login , then get token and basket_id.
    cy.make_post_request_to_login_application(email, password)
    .then((response)=>{
      token = response.body.authentication.token; // save token for other api resquest
      basket_id = response.body.authentication.bid;   // save user id for other api request      
      
      // make get reques to get existing basket, and delete if basket has existing item.
      cy.make_get_request_to_get_existing_basket_via_api(token, basket_id)
            .then(response => {
               var products = response.body.data.Products;
               if(products.length !== 0){    // check if basket has existing items.
                 products.forEach(item=>{
                   var item_id = item.BasketItem.id; 
                   cy.make_post_request_to_delete_existing_basket_via_api(token, item_id);   // remove existing item from basket.
                 })   
               }
            });
      
      // make request to get list item which has quantity > 0
      cy.make_get_request_to_product_quantity_via_api(token)
            .then((response) =>{
              var data = response.body.data;
              data.forEach((e=>{
                if(e.quantity !== 0){
                  list_product_quantity.push(e);
                }
              }))
            });
    });


  });


  it('As a user I can remove item from basket via api successfully', ()=>{
    // generate 2 unique number and get 2 unique product id for later to add to basket.
    var arr = generateUniqueNumbers(2, list_product_quantity.length);
    var prdID_01 = list_product_quantity[arr[0]].ProductId;
    var prdID_02 = list_product_quantity[arr[1]].ProductId;


    // create object to store products which will be for testing.
    var items_added = [
      {
        product_id: prdID_01,
        quantity: 1
      },
      {
        product_id: prdID_02,
        quantity: 2
      }
    ]

    // add 2 products to basket.
    items_added.forEach(e=>{
      cy.make_post_request_to_add_item_to_basket_via_api(token, basket_id, e.product_id, e.quantity)
          .then(response=>{
              var data = response.body.data;
              var actual_product_id = data.ProductId;
              var actual_qty = data.quantity;
              var actual_basket_id = data.BasketId;
              expect(actual_product_id).to.eq(e.product_id);
              expect(actual_qty).to.eq(e.quantity);
              expect(actual_basket_id).to.eq(basket_id)    
          });
    });

    // make request to get basket detail and get 1 basket_item_id for later to remove item from basket.
    cy.make_get_request_to_get_existing_basket_via_api(token, basket_id)
    .then(response => {
       var baskit_item_id_delete = response.body.data.Products[1].BasketItem.id;
       // remove item from basket.
       cy.make_post_request_to_delete_existing_basket_via_api(token, baskit_item_id_delete);
    });


    // make request to get basket items and verify only have 1 item. but we already removed 1 item.
    cy.make_get_request_to_get_existing_basket_via_api(token, basket_id)
    .then(response => {
      var products = response.body.data.Products;
      expect(products).to.be.an("array");
      expect(products).to.have.length(1);
    });
  });

});
