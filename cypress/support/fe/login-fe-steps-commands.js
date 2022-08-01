var LoginPage = require('../../pages/LoginPage')
var MenuPage = require('../../pages/MenuPage')

var loginpage = new LoginPage();
var menupage = new MenuPage();

// ***********************************************************
// this function is used for login to application. 
// make sure you are at the home page.
// step 1: we click menu 'Account'
// step 2: we click menu 'Login'
// step 3: when the login page is shown, we input username and password and click login button
// ***********************************************************
Cypress.Commands.add('login_to_application', (email, password)=>{
    menupage.clickMenuAccount();
    menupage.clickMenuLogin();
    loginpage.setEmailField(email);
    loginpage.setPasswordField(password);
    loginpage.clickButtonLogin();
});

// ***********************************************************
// this function is used for validating if user logins successfully or not
// argument is the email
// step 1: we click menu 'Account'
// step 2: we get the text of menu profile
// step 3: after get the text of step 2 , we remove space before and end and we compare it must be equal with the email we input.
// ***********************************************************
Cypress.Commands.add('assert_login_successfully', (expected_email)=>{
    menupage.clickMenuAccount();
    menupage.getMenuProfile().should(($el)=>{
        expect($el.text().trim()).equal(expected_email);
    });
});