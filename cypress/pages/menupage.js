function MenuPage(){

    this.menuAccount = 'button[id="navbarAccount"]';    // element menu Account 
    this.menuLogin = 'button[id="navbarLoginButton"]';    // element menu login (it will show, when click the menu Account)
    this.menuProfile = 'button[aria-label="Go to user profile"] > span';   // element menu profile name 
    this.iconSearch = 'span[class^="mat-search_icons"]';
    this.iconYourBasket = ' Your Basket';
    this.txtSearch = 'input[type="text"]';  
    this.iconClearSearch = 'close';
    
    this.clickMenuAccount = ()=>{
        cy.get(this.menuAccount)
          .click();
    };

    this.clickMenuLogin = ()=>{
        cy.get(this.menuLogin)
            .click();
    };

    this.clickIconSearch = ()=>{
       cy.contains('search')
         .click();
    }

    this.clickMenuTitlePage = ()=>{
        cy.contains(' OWASP Juice Shop ')
          .click();
    };

    this.getMenuProfile = ()=>{
        return cy.get(this.menuProfile);
    };

    this.getLabelItem = ()=>{
        return cy.get('span[class*="counter"]')
    };

    this.clickIconYourBasket = ()=>{
        cy.contains(this.iconYourBasket)
            .click();
    };

    this.waitProductsAreAddedComplete = (nber_of_products)=>{
        cy.get(nber_of_products)
            .should('be.visible');
               
    };

    this.setSearchField = (productName)=>{
        cy.get(this.txtSearch)
           .type(productName)
            .type('{enter}');
    };

    this.clickIconClearSearch = ()=>{
        cy.get('span')
            .find('mat-icon')
              .contains(this.iconClearSearch)
                .click();
    };




}

module.exports = MenuPage;