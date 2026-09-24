describe('Transfer', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.loginWithValidCredentials();
    })

    it('Must successfuly transfer money when data and values are valid', () => {
        // Act
        cy.transferMoney('Maria', 'João', '11');

        //Assertions
        cy.validateToastMessage('Transferência realizada!');
    })

    it('Must not transfer money over 5k between accounts when token is missing', () => {
        // Act
        cy.transferMoney('Maria', 'João', '4000.01');

        // Assertions
        cy.validateToastMessage('Autenticação necessária para transferências acima de R$5.000,00.');
    })
})