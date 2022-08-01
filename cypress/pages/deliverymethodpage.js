function DeliveryMethodPage(){
    this.lbelDeliveryAddress = 'div[class*="address"]';
    this.btnContinue = 'button[aria-label="Proceed to delivery method selection"]';

    this.getLbelDeliveryAddress = () =>{
        cy.get(this.lbelDeliveryAddress)
            .find('div')
              .eq(1);
    }

    this.selectDeliveryMethod = (day)=>{
        cy.contains(`${day} Days`)
            .click();
    }

    this.clickBtnContinue = () =>{
        cy.get(this.btnContinue)
            .click();
    }

}

module.exports = DeliveryMethodPage;