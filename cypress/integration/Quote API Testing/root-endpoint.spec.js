describe('Root Endpoint GET /', () => {
    it('Should send status 200', () => {
        cy.request('/')
            .then(response => {
                expect(response.status).to.eq(200)

            })
    })
    it('Should have Body with status ok', () => {
        cy.request('/')
            .then(response => {
                expect(response.status).to.eq(200)
                let body = response.body;
                expect(body).to.have.property('status', 'ok')
            })
    })
})
