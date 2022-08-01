function AddressPage(){
    this.btnAddNewAddress = 'button[class*="btn-new-address"]';
    this.btnContinue = 'Continue';

    this.clickBtnContinue = ()=>{
        cy.contains(this.btnContinue)
            .click({force: true});
    }
    
    this.clickFirstAddress = ()=>{
        cy.get('mat-cell[class*="column-Address"]')
            .first()
             .click();
    }

    this.getSelectedAddress = ()=>{
        cy.get('mat-radio-button[class*="radio-checked"]')
            .parent()
             .parent() 
               .find('mat-cell')
                 .eq(2);               
    }

    this.clickBtnAddNewAddress = ()=>{
        cy.get(this.btnAddNewAddress)
            .click();
    }
}

module.exports = AddressPage;