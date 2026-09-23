Cypress.Commands.add('transferMoney', (fromAccount, toAccount, amount) => {
    cy.selectComboBoxOption('conta-origem', fromAccount);
    cy.selectComboBoxOption('conta-destino', toAccount);
    cy.get('#valor')
        .click()
        .type(amount);
    cy.contains('button', 'Transferir').click();
})