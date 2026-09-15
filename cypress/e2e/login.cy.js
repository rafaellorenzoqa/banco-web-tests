describe('login', () => {
  // Arrange
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  })

  it('Login using valid data must login correctly', () => {
    // Act
    cy.fixture('credentials').then(credentials => {
      cy.get('#username')
        .click()
        .type(credentials.valid.username);

      cy.get('#senha')
        .click()
        .type(credentials.valid.password);
    })

    cy.contains('button','Entrar')
      .click();
    
    // Assert
    cy.contains('h4', 'Realizar Transferência')
      .should('be.visible');
  })

  it('Login using invalid data must show error message', () => {
    // Act
    cy.fixture('credentials').then(credentials => {
      cy.get('#username')
        .click()
        .type(credentials.invalid.username);

      cy.get('#senha')
        .click()
        .type(credentials.invalid.password);
    })

    cy.contains('button', 'Entrar')
      .click();
    
    // Assert
    cy.get('.toast')
      .should('have.text', 'Erro no login. Tente novamente.');
  })

})