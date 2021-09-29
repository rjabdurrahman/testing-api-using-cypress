describe('Endpoint GET /quota', () => {
    const apiKey = Cypress.env('API_KEY')

    it('Should send status 200', () => {
        cy.request('/quota')
            .then(response => {
                expect(response.status).to.eq(200)
            })
    })

    it('Request without API key should send body with error true and message', () => {
        cy.request(`/quota`)
            .then(response => {
                let body = response.body;
                expect(body).to.a('object')
                expect(body).to.have.keys('error', 'message')
                expect(body).to.have.property('error', true)
                expect(body).to.have.property('message', "API Key Not Valid. Please go to 1forge.com to get an API key. If you have any questions please email us at contact@1forge.com")
            })
    })

    it('Request with valid API Key should send an object with key quota_used, quota_limit, quota_remaining, hours_until_reset', () => {
        cy.request(`/quota?api_key=${apiKey}`)
            .then(response => {
                let body = response.body;
                expect(body).to.a('object')
                expect(body).to.have.keys('quota_used', 'quota_limit', 'quota_remaining', 'hours_until_reset')
                expect(body.quota_used).to.be.a('number')
                expect(body.quota_limit).to.be.a('number')
                expect(body.quota_remaining).to.be.a('number')
                expect(body.hours_until_reset).to.be.a('number')
            })
    })

})