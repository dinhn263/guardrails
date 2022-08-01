/**
 * This test case is used for adding 1 to basket.
 * Pre-conditions:
 *    + step 1: we have to login via api to get token and basket id of user. These values are global variables.
 *    + step 2: after have token, basket id on step 1, we will send api to get existing basket.
 *              check basket has any existing items then we remove all items.
 *    + step 3: we send request to get list product with quantity and store in variable: "list_product_quantity"
 * 
 * Steps:
 *    + step 1: we will generate 1 numbers (in range of list_product_quantity'lengths)
 *              from this index, we will get a product id from array 'list_product_quantity'.
 *    + step 2: make get request to add item from step 1
 *    + step 4: make get request to check basket contains the item we add on step 2.   
* */

var basket_id = '';
var token = '';
var list_product_quantity = [];     // this array variable to store the product which has quantity >0

context('Order item via api', () => {
  var email = Cypress.config().email;          // get email value from json file
  var password = Cypress.config().password;    // get password value from json file

  beforeEach(()=>{
    // make request to login , then get token and basket_id.
    cy.make_post_request_to_login_application(email, password)
    .then((response)=>{
      token = response.body.authentication.token; // save token for other api resquest
      basket_id = response.body.authentication.bid;   // save user id for other api request      
      
      // make request to get basket detail and remove all existing items in basket.
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
      
      
      // make request to get product which quantity > 0.
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


  it('As a user I can place order with 1 item via api successfully', ()=>{
      
      // get random product id
      var total = list_product_quantity.length;
      var i = Math.floor(Math.random() * (total-1)) + 1;
      var product_id = list_product_quantity[i].ProductId;
      var quantity = 1;

      // make request to add item to basket.
      cy.make_post_request_to_add_item_to_basket_via_api(token, basket_id, product_id, quantity)
          .then(response=>{
              var data = response.body.data;
              var actual_product_id = data.ProductId;
              var actual_qty = data.quantity;
              var actual_basket_id = data.BasketId;
              expect(actual_product_id).to.eq(product_id);
              expect(actual_qty).to.eq(quantity);
              expect(actual_basket_id).to.eq(basket_id)

              // make reques to get basket detail to check if item is added successfully
              cy.make_get_request_to_get_existing_basket_via_api(token, basket_id)
                .then(response =>{
                    var item_added = response.body.data.Products[0];
                    var item_id = item_added.BasketItem.ProductId;
                    var item_qty = item_added.BasketItem.quantity;
                    var item_bket = item_added.BasketItem.BasketId;
                    expect(item_id).to.eq(product_id);
                    expect(item_qty).to.eq(item_qty);
                    expect(item_bket).to.eq(basket_id);
                });
          });
  });

});
