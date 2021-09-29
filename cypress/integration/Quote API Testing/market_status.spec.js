describe('Endpoint GET /market_status', () => {
    const apiKey = Cypress.env('API_KEY')

    it('Should send status 200', () => {
        cy.request('/market_status')
            .then(response => {
                expect(response.status).to.eq(200);
            })
    })

    it('Request without API key should send body with error true and message', () => {
        cy.request(`/market_status`)
            .then(response => {
                expect(response.status).to.eq(200)
                let body = response.body;
                expect(body).to.a('object');
                expect(body).to.have.keys('error', 'message');
                expect(body).to.have.property('error', true);
                expect(body).to.have.property('message', "API Key Not Valid. Please go to 1forge.com to get an API key. If you have any questions please email us at contact@1forge.com");
            })
    })

    it('Request with valid API Key should send an object with key market_is_open', () => {
        cy.request(`/market_status?api_key=${apiKey}`)
            .then(response => {
                expect(response.status).to.eq(200);
                let body = response.body;
                expect(body).to.a('object');
                expect(body).to.have.property('market_is_open');
                expect(body.market_is_open).to.be.a('boolean');
            })
    })

})