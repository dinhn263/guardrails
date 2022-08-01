var MenuPage = require('../../pages/MenuPage')

var menupage = new MenuPage();
Cypress.Commands.add('search_an_item', (item_name)=>{   
    menupage.clickIconSearch();
    menupage.setSearchField(item_name);    
});
