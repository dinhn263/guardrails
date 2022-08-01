Cypress.Commands.add('make_get_request_to_get_existing_basket_via_api', (token, basket_id)=>{
    var base_url = Cypress.config().baseUrl;
    var uri_basket = Cypress.config().uri.uri_basket;
    cy.request({
        method: 'GET',
        url: `${base_url}${uri_basket}${basket_id}`,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        }
    }).then((response)=>{
        expect(response.status).to.be.eq(200);
        expect(response.body.status).to.be.eq('success');
    });
});

Cypress.Commands.add('make_get_request_to_get_list_product_via_api', (token)=>{
    var base_url = Cypress.config().baseUrl;
    var uri_search_product = Cypress.config().uri.uri_search_product;
    cy.request({
        method: 'GET',
        url: `${base_url}${uri_search_product}`,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        }
    }).then((response)=>{
        expect(response.status).to.be.eq(200);
        expect(response.body.status).to.be.eq('success');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data).to.have.lengthOf.greaterThan(0);
    });
});

Cypress.Commands.add('make_post_request_to_delete_existing_basket_via_api', (token, basket_item_id)=>{
    var base_url = Cypress.config().baseUrl;
    var uri_basket_item = Cypress.config().uri.uri_basket_item;
    cy.request({
        method: 'DELETE',
        url: `${base_url}${uri_basket_item}${basket_item_id}`,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        }
    }).then((response)=>{
        expect(response.status).to.be.eq(200);
        expect(response.body.status).to.be.eq('success');
    });
});

Cypress.Commands.add('make_get_request_to_product_quantity_via_api', (token)=>{
    var base_url = Cypress.config().baseUrl;
    var uri_product_quantity = Cypress.config().uri.uri_product_quantity;
    cy.request({
        method: 'GET',
        url: `${base_url}${uri_product_quantity}`,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        }
    }).then((response)=>{
        expect(response.status).to.be.eq(200);
        expect(response.body.status).to.be.eq('success');
        expect(response.body.data).to.be.an('array');
    });
});

Cypress.Commands.add('make_post_request_to_add_item_to_basket_via_api', (token, basket_id, product_id, quantity)=>{
    var base_url = Cypress.config().baseUrl;
    var uri_basket_item = Cypress.config().uri.uri_basket_item;
    cy.request({
        method: 'POST',
        url: `${base_url}${uri_basket_item}`,
        headers: {
            authorization: `Bearer ${token}`,
            accept: 'application/json'
        },
        body: {
            BasketId: basket_id,
            ProductId: product_id,
            quantity: quantity
        }
    }).then((response)=>{
        expect(response.status).to.be.eq(200);
        expect(response.body.status).to.be.eq('success');
    });
});