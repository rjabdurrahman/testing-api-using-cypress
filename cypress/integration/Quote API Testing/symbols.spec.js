describe('Endpoint GET /symbols', () => {

    it('Should send status 200', () => {
        cy.request('/symbols')
            .then(response => {
                expect(response.status).to.eq(200)
            })
    })

    it('Request without API key should send body with error true and message', () => {
        cy.request('/symbols')
            .then(response => {
                let body = response.body;
                expect(body).to.a('object')
                expect(body).to.have.keys('error', 'message')
                expect(body).to.have.property('error', true)
                expect(body).to.have.property('message', "API Key Not Valid. Please go to 1forge.com to get an API key. If you have any questions please email us at contact@1forge.com")
            })
    })

})