describe('login', () => {

  // Arrange
  beforeEach(() => {
    cy.visit('/');
  })

  it('Login using valid data must login correctly', () => {
    // Act
    cy.loginWithValidCredentials();

    // Assert
    cy.contains('h4', 'Realizar Transferência')
      .should('be.visible');
  })

  it('Login using invalid data must show error message', () => {
    // Act
    cy.loginWithInvalidCredentials();

    // Assert
    cy.validateToastMessage('Erro no login. Tente novamente.');
  
  })

})