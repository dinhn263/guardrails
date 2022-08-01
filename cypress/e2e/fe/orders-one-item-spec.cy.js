import {generateRandomAddress} from '../../support/utils'

var basket_id = '';
var token = '';
var list_product_quantity = [];
var list_product = [];
var list_product_add = [];


context('Test features ordering with 1 item', () => {

  var email = Cypress.config().email;
  var password = Cypress.config().password;

  beforeEach(()=>{
    
    // make request to login to get token for other api call, and get bid (basket id)
    cy.make_post_request_to_login_application(email, password)
        .then((response)=>{
          token = response.body.authentication.token; // save token for other api resquest
          basket_id = response.body.authentication.bid;   // save basket id for other api request      
        

          // make request to get list product which has quantity > 0 and assign to variable 'list_product_quantity'
          cy.make_get_request_to_product_quantity_via_api(token)
            .then((response) =>{
              var data = response.body.data;
              data.forEach((e=>{
                if(e.quantity !== 0){
                  list_product_quantity.push(e);
                }
              }))
            });


          // make request to get basket detail and remove all pending item before.  
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
          
          
          
          // make request to get list product (it will include product which quantity =0 or !=0) and assign to variable 'list_product'
          cy.make_get_request_to_get_list_product_via_api(token)
              .then(response =>{
                 var data = response.body.data;
                 list_product = data;
              });
        
          
          // make get request to get existing address and remove all.
          cy.make_get_request_to_get_all_existing_address_via_api(token)
              .then(response =>{
                  var data = response.body.data;
                  if(data.length > 0){
                    data.forEach(e=>{
                      var addrID = e.id;
                      cy.make_get_request_to_delete_existing_address_via_api(token, addrID);
                    });
                  }
              });
        
        });

    cy.open_application();
    cy.login_to_application(email, password);
   
  });


  it('As a user I can place order with 1 item successfully', ()=>{
      var max = list_product_quantity.length;
      var i = Math.floor(Math.random() * (max-1)) + 1;
      var product_id = list_product_quantity[i].ProductId;    // get 1 production id which product quantity > 0.
      list_product.forEach(e=>{
        if(e.id === product_id) {
          list_product_add.push(e);        
        }
      })
      cy.search_and_add_item_to_basket(list_product_add);
      cy.view_basket_detail();
      cy.assert_products_are_added_to_basket_successfully(list_product_add);
      cy.go_to_checkout_page();

      var address = generateRandomAddress();
      cy.add_new_address(address)
      cy.select_first_address();
      cy.save_selected_address()
          .invoke('text')
            .then((text)=>{
              cy.wrap(text).as('selected_addr');
            });
      cy.go_to_address_page();
      cy.get_delivery_address()
          .invoke('text')
            .then((text)=>{
              cy.get('@selected_addr').should('contain', text);
            });
      
      var days = [1, 3, 5]
      var day = days[Math.floor(Math.random()*days.length)];
      cy.select_delivery_method(day);
      cy.go_to_payment_method_page();
      cy.select_first_payement_and_go_to_reivew_page();
      //cy.place_order_and_pay();
      //cy.assert_order_is_placed_successfully();
    });
});
