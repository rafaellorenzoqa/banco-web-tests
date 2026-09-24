describe('Login', () => {

  // Arrange
  beforeEach(() => {
    cy.visit('/');
  })

  it('Must login successfully when credentials are valid', () => {
    // Act
    cy.loginWithValidCredentials();

    // Assert
    cy.contains('h4', 'Realizar Transferência')
      .should('be.visible');
  })

  it('Must show an error message when credentials are invalid', () => {
    // Act
    cy.loginWithInvalidCredentials();

    // Assert
    cy.validateToastMessage('Erro no login. Tente novamente.');
  })

})