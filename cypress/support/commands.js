import "./fe/login-fe-steps-commands";
import "./fe/order-fe-steps-commands";
import "./fe/search-fe-steps-commands";
import "./fe/address-fe-steps-commands"
import "./api/login-api-steps-commands";
import "./api/order-api-steps-commands";
import "./api/address-api-steps-commands"
import "cypress-localstorage-commands"





Cypress.Commands.add('open_application', ()=>{
    var url = Cypress.config().baseUrl;
    cy.visit(url);
    cy.contains('Dismiss')
        .click();
    cy.contains('Me want it')
        .click();
})



