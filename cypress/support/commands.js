Cypress.Commands.add("form_request", (url, formData) => {
    return cy
        .server()
        .route("POST", url)
        .as("formRequest")
        .window()
        .then(win => {
            var xhr = new win.XMLHttpRequest();
            xhr.open(method, url);
            xhr.send(formData);
        })
        .wait("@formRequest");
});
