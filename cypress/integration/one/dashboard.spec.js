describe('Testing Dashboard', () => {
    it('Getting Posts', () => {
        cy.request('/posts')
        .its('body')
        .should('have.length', 100)
    })
})