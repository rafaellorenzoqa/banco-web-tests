describe('Transfer', () => {

    // Arrange
    beforeEach(() => {
        cy.visit('/');
        cy.loginWithValidCredentials();
    })

    it('Must successfully transfer money when data and values are valid', () => {
        // Act
        cy.transferMoney('Maria', 'João', '11');

        // Assert
        cy.validateToastMessage('Transferência realizada!');
    })

    it('Must not transfer money over 5k between accounts when token is missing', () => {
        // Act
        cy.transferMoney('Maria', 'João', '5000.01');

        // Assert
        cy.validateToastMessage('Autenticação necessária para transferências acima de R$5.000,00.');
    })
})