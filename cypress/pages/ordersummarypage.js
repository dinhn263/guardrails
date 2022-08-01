function OrderSummaryPage(){

     this.btnPlaceOrderAndPay = 'button[id="checkoutButton"]';

     this.clickBtnPlaceOrderAndPay = ()=>{
        cy.get(this.btnPlaceOrderAndPay)
            .click();
     }

}

module.exports = OrderSummaryPage;