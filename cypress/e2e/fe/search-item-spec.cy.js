/**
 * This test case is used for checking search function is correct.
 * Pre-conditions: Open browser and go to application
 * Steps:
 *    + step 1: search the word 'apple'
 *    + step 2: assert there are 2 items shown on the page. and there is no item which name 'banana' shown on page.  
* */

context('Search Feature', () => {

  beforeEach(()=>{
    cy.open_application(); 
  });


  it('As a user I can check search result is correct', ()=>{
      var item = 'apple';
      var not_existing_item = 'banana';
      cy.search_an_item(item)
          .then(()=>{
            cy.get('div[class="item-name"]')
               .should('have.length', 2)
               .should('not.have.value', not_existing_item)
          });
  });

});
