Cypress.Commands.add('make_get_request_to_get_all_existing_address_via_api', (token)=>{
    cy.log(`token: ${token}`)
    var base_url = Cypress.config().baseUrl;
    var uri_address = Cypress.config().uri.uri_address;

    cy.request({
        method: 'GET',
        url: `${base_url}${uri_address}`,
        failOnStatusCode: false,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        }
    }).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body.status).to.be.eq('success');
        expect(response.body.data).to.be.an('array');
    });
});

Cypress.Commands.add('make_get_request_to_delete_existing_address_via_api', (token, address_id)=>{
    
    var base_url = Cypress.config().baseUrl;
    var uri_address = Cypress.config().uri.uri_address;

    cy.request({
        method: 'DELETE',
        url: `${base_url}${uri_address}${address_id}`,
        failOnStatusCode: false,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        }
    }).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body.status).to.be.eq('success');
        expect(response.body.data).to.be.eq('Address deleted successfully.');
    });
});

