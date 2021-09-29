describe('Testing Dashboard', () => {
    it('Getting Posts', () => {
        cy.request('/posts')
        .its('body')
        .should('be.a', 'array')
        .should('have.lengthOf', 100)
    })
})