function PaymentPage(){
    this.btnContinue = 'button[aria-label="Proceed to review"]';

    this.clickFirstPaymentOption = ()=>{
        cy.get('mat-table[role="table"]')
            .find('mat-row')
                .eq(0)
                    .find('mat-cell')
                        .eq(0)
                            .click();
    }
    
    this.clickBtnContinue = ()=>{
        cy.get(this.btnContinue)
            .click();
    }
}

module.exports = PaymentPage;