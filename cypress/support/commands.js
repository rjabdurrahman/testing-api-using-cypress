Cypress.Commands.add("form_request", (url, formData) => {
    /* Visiting this site to Bypass CORS for different Base URL */
    cy.visit('https://api.anonfiles.com')
    return cy
        .server()
        .route("POST", url)
        .as("formRequest")
        .window()
        .then(win => {
            var xhr = new win.XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(formData);
        })
        .wait("@formRequest");
});