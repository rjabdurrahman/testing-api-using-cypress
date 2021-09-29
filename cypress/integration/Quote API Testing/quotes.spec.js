describe('Endpoint GET /quotes', () => {
    it('Should send status 200', () => {
        cy.request('/quotes')
            .then(response => {
                expect(response.status).to.eq(200)
            })
    })

    it('Request  without API key should send body with error true and message', () => {
        cy.request('/quotes')
            .then(response => {
                let body = response.body;
                expect(body).to.a('object')
                expect(body).to.have.keys('error', 'message')
                expect(body).to.have.property('error', true)
            })
    })
})