import {generateUniqueNumbers} from '../../support/utils'

/**
 * This test case is used for validating adding 2 items to basket.
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
 *    + step 2: make get request to add item 1
 *    + step 3: make get request to add item 2
 *    + step 4: make get request to check basket and verify basket contains 2 items added on step 2, 3
 *    
* */

var basket_id = '';
var token = '';
var list_product_quantity = [];

context('Order item via api', () => {
  var email = Cypress.config().email;
  var password = Cypress.config().password;

  beforeEach(()=>{
    cy.make_post_request_to_login_application(email, password)
    .then((response)=>{
      token = response.body.authentication.token; // save token for other api resquest
      basket_id = response.body.authentication.bid;   // save user id for other api request      
      
      // make reques to get basket detail and check if any item then we remove item from basket.
      cy.make_get_request_to_get_existing_basket_via_api(token, basket_id)
            .then(response => {
               var products = response.body.data.Products;
               if(products.length !== 0){
                 products.forEach(item=>{
                   var item_id = item.BasketItem.id; 
                   cy.make_post_request_to_delete_existing_basket_via_api(token, item_id);
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


  it('As a user I can place order with 2 item via api successfully', ()=>{
    var arr = generateUniqueNumbers(2, list_product_quantity.length)

    var product_id_01 = list_product_quantity[arr[0]].ProductId;
    var quantity_01 = 1;
    var product_id_02 = list_product_quantity[arr[1]].ProductId;
    var quantity_02 = 1;

    // make request to add item 1
    cy.make_post_request_to_add_item_to_basket_via_api(token, basket_id, product_id_01, quantity_01)
          .then(response=>{
              var data = response.body.data;
              var actual_product_id = data.ProductId;
              var actual_qty = data.quantity;
              var actual_basket_id = data.BasketId;
              expect(actual_product_id).to.eq(product_id_01);
              expect(actual_qty).to.eq(quantity_01);
              expect(actual_basket_id).to.eq(basket_id)    
          });

    // make request to add item 2
    cy.make_post_request_to_add_item_to_basket_via_api(token, basket_id, product_id_02, quantity_02)
        .then(response=>{
            var data = response.body.data;
            var actual_product_id = data.ProductId;
            var actual_qty = data.quantity;
            var actual_basket_id = data.BasketId;
            expect(actual_product_id).to.eq(product_id_02);
            expect(actual_qty).to.eq(quantity_02);
            expect(actual_basket_id).to.eq(basket_id)    
        });
    

    // make request to get basket detail and check 2 items are added successfully.
    cy.make_get_request_to_get_existing_basket_via_api(token, basket_id)
      .then(response =>{
          var item_added_01 = response.body.data.Products[0];
          var item_id_01 = item_added_01.BasketItem.ProductId;
          var item_qty_01 = item_added_01.BasketItem.quantity;
          var item_bket_01 = item_added_01.BasketItem.BasketId;
          expect(item_id_01).to.eq(product_id_01);
          expect(item_qty_01).to.eq(quantity_01);
          expect(item_bket_01).to.eq(basket_id);

          var item_added_02 = response.body.data.Products[1];
          var item_id_02 = item_added_02.BasketItem.ProductId;
          var item_qty_02 = item_added_02.BasketItem.quantity;
          var item_bket_02 = item_added_02.BasketItem.BasketId;
          expect(item_id_02).to.eq(product_id_02);
          expect(item_qty_02).to.eq(quantity_02);
          expect(item_bket_02).to.eq(basket_id);
      });

      
  });

});
