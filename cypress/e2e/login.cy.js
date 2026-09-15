describe('login', () => {
  // Arrange
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  })

  it('Login using valid data must login correctly', () => {
    // Act
    cy.get('#username')
      .click()
      .type('julio.lima');

    cy.get('#senha')
      .click()
      .type('123456');

    cy.contains('button','Entrar')
      .click();
    
    // Assert
    cy.contains('h4', 'Realizar Transferência')
      .should('be.visible');
  })

  it('Login using invalid data must show error message', () => {
    // Act
    cy.get('#username')
      .click()
      .type('julio.lima');

    cy.get('#senha')
      .click()
      .type('654321'); //incorrect password

    cy.contains('button', 'Entrar')
      .click();
    
    // Assert
    cy.get('.toast')
      .should('have.text', 'Erro no login. Tente novamente.');
  })

})