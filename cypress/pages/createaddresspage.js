function CreateAddressPage(){
    this.txtCountry = 'input[data-placeholder="Please provide a country."]';
    this.txtName = 'input[data-placeholder="Please provide a name."]';
    this.txtMobile = 'input[data-placeholder="Please provide a mobile number."]';
    this.txtZipCode = 'input[data-placeholder="Please provide a ZIP code."]';
    this.txtAddress = 'textarea[data-placeholder="Please provide an address."]';
    this.txtCity = 'input[data-placeholder="Please provide a city."]';
    this.txtState = 'input[data-placeholder="Please provide a state."]';
    this.btnSubmit = 'button[id="submitButton"]';


    this.setTxtCountry = (country)=>{
        cy.get(this.txtCountry)
            .type(country);
    }

    this.setTxtName = (name)=>{
        cy.get(this.txtName)
            .type(name);
    }

    this.setTxtMobile = (mobile)=>{
        cy.get(this.txtMobile)
            .type(mobile);
    }

    this.setTxtZipCode = (zipcode)=>{
        cy.get(this.txtZipCode)
            .type(zipcode);
    }

    this.setTxtAddress = (addr)=>{
        cy.get(this.txtAddress)
            .type(addr);
    }

    this.setTxtCity = (city)=>{
        cy.get(this.txtCity)
            .type(city);
    }

    this.setTxtState = (state)=>{
        cy.get(this.txtState)
            .type(state);
    }

    this.clickBtnSubmit = ()=>{
        cy.get(this.btnSubmit)
            .click();
    }

}

module.exports = CreateAddressPage;