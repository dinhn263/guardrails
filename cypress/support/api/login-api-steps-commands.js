Cypress.Commands.add('make_post_request_to_login_application', (p_email, p_password)=>{
    
    var base_url = Cypress.config().baseUrl;
    var uri_login = Cypress.config().uri.uri_login;

    cy.request({
        method: 'POST',
        url: `${base_url}${uri_login}`,
        failOnStatusCode: false,
        body: {
            email: p_email,
            password: p_password
        }
    }).should((response)=>{
        expect(response.status).to.eq(200);
        var token = response.body.authentication.token;
        var bid = response.body.authentication.bid;
        var umail = response.body.authentication.umail;
        expect(token).to.not.be.empty;
        expect(bid).to.be.a('number');
        expect(umail).to.be.eq(p_email);    
    });
});

