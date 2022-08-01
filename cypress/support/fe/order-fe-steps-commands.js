var MenuPage = require('../../pages/MenuPage')
var SearchPage = require('../../pages/SearchPage')
var BasketPage = require('../../pages/BasketPage')
var AddressPage = require('../../pages/AddressPage')
var DeliveryMethodPage = require('../../pages/DeliveryMethodPage')
var PaymentPage = require('../../pages/PaymentPage')
var OrderSummaryPage = require('../../pages/OrderSummaryPage')


var searchpage = new SearchPage();
var menupage = new MenuPage();
var basketpage = new BasketPage();
var addresspage = new AddressPage();
var deliverymethodpage = new DeliveryMethodPage();
var paymentpage = new PaymentPage();
var ordersummarypage = new OrderSummaryPage();

Cypress.Commands.add('search_and_add_item_to_basket', (list_product)=>{
    list_product.forEach((item)=>{
        var name = item.name;
        menupage.clickIconSearch();
        menupage.setSearchField(name);
        searchpage.clickButtonAddToBasket();
        searchpage.waitUntilNotificationAddedSuccessfullyShown(name);
        menupage.clickIconClearSearch();
    });
    
});

Cypress.Commands.add('get_total_pending_item_in_basket', ()=>{
    return menupage.getLabelItem;
});


Cypress.Commands.add('view_basket_detail', ()=>{
    menupage.clickIconYourBasket();
});

Cypress.Commands.add('assert_products_are_added_to_basket_successfully', (list_product)=>{
    list_product.forEach(e=>{
        var product_name = e.name;
        basketpage.assert_product_is_added_to_basket(product_name);
    })
});

Cypress.Commands.add('go_to_checkout_page', ()=>{
    basketpage.clickBtnCheckOut();
});

Cypress.Commands.add('select_first_address', ()=>{
    addresspage.clickFirstAddress();
});

Cypress.Commands.add('save_selected_address', ()=>{
    addresspage.getSelectedAddress();
})

Cypress.Commands.add('go_to_address_page', ()=>{
    addresspage.clickBtnContinue();
})

Cypress.Commands.add('get_delivery_address', ()=>{
    deliverymethodpage.getLbelDeliveryAddress();
})

Cypress.Commands.add('select_delivery_method', (day)=>{
    deliverymethodpage.selectDeliveryMethod(day);
})

Cypress.Commands.add('go_to_payment_method_page', ()=>{
    deliverymethodpage.clickBtnContinue();
})

Cypress.Commands.add('select_first_payement_and_go_to_reivew_page', ()=>{
    paymentpage.clickFirstPaymentOption();
    paymentpage.clickBtnContinue();
})

Cypress.Commands.add('place_order_and_pay', ()=>{
    ordersummarypage.clickBtnPlaceOrderAndPay();
})

Cypress.Commands.add('assert_order_is_placed_successfully', ()=>{
    cy.get('h1[class="confirmation"]')  
        .should('have.text', 'Thank you for your purchase!');
})