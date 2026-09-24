Cypress.Commands.add('validateToastMessage', (message) => {
    cy.get('.toast').should('have.text', message);
})

Cypress.Commands.add('selectComboBoxOption', (label, selection) => {
    cy.get(`label[for="${label}"]`).parent().as(`${label}-field`); //creates a nickname for cy.get('label[for="label"]').parent()
        cy.get(`@${label}-field`)
            .click(); //find the son, go back up to the parent and find the option we want.
        cy.get(`@${label}-field`)
            .contains(selection) //the name of the selection in the combo box
            .click();
})