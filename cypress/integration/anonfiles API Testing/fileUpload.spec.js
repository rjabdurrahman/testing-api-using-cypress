// Already have a baseUrl in cypress.json
const baseUrlOfAnonFiles = 'https://api.anonfiles.com';

before(() => {
    /* Visiting this site to Bypass CORS for different Base URL */
    cy.visit(baseUrlOfAnonFiles)
})

describe('Testing file Upload', () => {
    it('Should send status 400 if don\'t attach file', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrlOfAnonFiles}/upload`,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
            })
    })

    it('Should send status 200 on file upload', () => {
        const fileName = 'demo_file.txt';
        const url = `${baseUrlOfAnonFiles}/upload`;
        const fileType = 'text/plain';
        cy.fixture(fileName, 'binary').then((fileBin) => {
            const blob = Cypress.Blob.binaryStringToBlob(fileBin, fileType);
            const formData = new FormData();
            formData.set('file', blob, fileName);
            cy.form_request(url, formData)
                .then(result => {
                    expect(result.status).to.eq(200);
                })
        })
    })

    it('Should get file details on response', () => {
        const fileName = 'demo_file.txt';
        const url = `${baseUrlOfAnonFiles}/upload`;
        const fileType = 'text/plain';
        cy.fixture(fileName, 'binary').then((fileBin) => {
            const blob = Cypress.Blob.binaryStringToBlob(fileBin, fileType);
            const formData = new FormData();
            formData.set('file', blob, fileName);
            cy.form_request(url, formData)
                .then(result => {
                    let response = result.response;
                    expect(response.body).to.be.a('object');
                    expect(response.body.data).to.have.property('file');
                    expect(response.body.data.file.metadata.name).to.be.equal(fileName);
                })
        })
    })
})