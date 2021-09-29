it('Testing Status', () => {
    cy.request('/')
    .then(response => {
        expect(response.status).to.eq(200)
        let body = response.body;
        expect(body).to.be.a('object')
        expect(body).to.have.property('status', 'ok')
    })
})