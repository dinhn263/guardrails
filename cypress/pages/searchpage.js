function SearchPage(){

     

    this.clickButtonAddToBasket = ()=>{
        cy.contains('Add to Basket')
           .click();
    };

    this.waitUntilNotificationAddedSuccessfullyShown = (product_name)=>{
        cy.contains(`Placed ${product_name} into basket.`, {timeout: 30000})
            .should('be.visible');
    }

    

    


}

module.exports = SearchPage;