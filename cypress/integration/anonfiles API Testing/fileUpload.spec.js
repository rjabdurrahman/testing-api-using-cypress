describe('Testing file Upload', () => {
    it('Should send response 200', () => {
        const fileName = 'demo_file.txt';
        const url = 'https://api.anonfiles.com/upload';
        const fileType = 'text/plain';
        cy.fixture(fileName, 'binary').then((fileBin) => {
            const blob = Cypress.Blob.binaryStringToBlob(fileBin, fileType);
            const formData = new FormData();
            formData.set('file', blob, fileName);
            cy.form_request(url, formData)
            .then(result => {
                let response = result.response;
                expect(result.status).to.eq(200);
                expect(response.body).to.be.a('object');
                expect(response.body.data).to.have.property('file');
                expect(response.body.data.file.metadata.name).to.be.equal(fileName);
            })
        })

    })
})