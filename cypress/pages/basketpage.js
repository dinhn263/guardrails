function BasketPage(){

    this.btnCheckOut = 'button[id="checkoutButton"]';

    this.assert_product_is_added_to_basket = (product_name)=>{
        cy.contains(product_name)
            .should('be.exist');
    }

    this.clickBtnCheckOut = ()=>{
        cy.get(this.btnCheckOut)
            .click();
    }
    

    


}

module.exports = BasketPage;