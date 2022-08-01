function LoginPage(){

    this.txtEmail = 'input[id="email"]';      // element text box email
    this.txtPassword = 'input[id="password"]';    // element text box password
    this.btnLogin = 'button[id="loginButton"]';   // element button login

    this.setEmailField = (email)=>{
        cy.get(this.txtEmail)
          .type(email);
    }

    this.setPasswordField = (password)=>{
        cy.get(this.txtPassword)
            .type(password);
    }

    this.clickButtonLogin = ()=>{
        cy.get(this.btnLogin)
            .click();        
    }

}

module.exports = LoginPage;