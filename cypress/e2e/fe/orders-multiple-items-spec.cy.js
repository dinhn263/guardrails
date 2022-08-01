import {generateRandomAddress} from '../../support/utils'
import {generateUniqueNumbers} from '../../support/utils'


/**
 * Note the reason why we have to create 2 variables: 
 * + list_product_quantity: this will hold all product which only has quantity > 0
 * + list_product: this will hold list products shown on web site but it will contains both product has quantity >0 and quantity=0
 * The reason why we have to create 2 above values is: 
 * + when website load it will triger api product/search (A) and return list of product but in this list does not contain quantity.
 * So that we can not know which product has quantity is 0 , which has quantity >0. 
 * If we select product has quantity = 0, it wil failed our test case. Because we dont handle the case 
 * selected product which quantity is 0. 
 * + However, we have other api /productQuantity (B) also return list of product but this list contain quantity.
 * But this api does not return name.
 * Short talk, api A does not return quantity, but return name.
 * api B does return quantity , but not return name.
 * that is why we create 2 variables: 
 *    + list_product_quantity: to store list product form api B
 *    + list_product: to store list product form api A
 * base on these value we can get the product (name, id) has quantity >0 
 */
var basket_id = '';    
var token = '';
var list_product_quantity = [];    
var list_product = [];
var list_product_add = [];


context('Test features ordering multiple items', () => {

  var email = Cypress.config().email;
  var password = Cypress.config().password;

  beforeEach(()=>{
    
    cy.make_post_request_to_login_application(email, password)
        .then((response)=>{
          token = response.body.authentication.token; // save token for other api resquest
          basket_id = response.body.authentication.bid;   // save basket id for other api request      
        
          cy.make_get_request_to_product_quantity_via_api(token)
            .then((response) =>{
              var data = response.body.data;
              data.forEach((e=>{
                if(e.quantity !== 0){
                  list_product_quantity.push(e);
                }
              }))
            });

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
          
          cy.make_get_request_to_get_list_product_via_api(token)
              .then(response =>{
                 var data = response.body.data;
                 list_product = data;
              });

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


    it('As a user I can place order with multiple items successfully', ()=>{
      var arr = generateUniqueNumbers(2, list_product_quantity.length);
      var list_products_id = [];
      arr.forEach(i=>{
        list_products_id.push(list_product_quantity[i].ProductId);
      });

      list_product.forEach(e=>{
        if (list_products_id.includes(e.id)){
          list_product_add.push(e);
        }
      })

      cy.search_and_add_item_to_basket(list_product_add);
      cy.view_basket_detail();
      cy.assert_products_are_added_to_basket_successfully(list_product_add);
      cy.go_to_checkout_page();
      var address = generateRandomAddress();
      cy.add_new_address(address);
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
