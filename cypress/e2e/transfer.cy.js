describe('Transfer', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('credentials').then(credentials => {
            cy.get('#username')
                .click()
                .type(credentials.valid.username);

            cy.get('#senha')
                .click()
                .type(credentials.valid.password);

            cy.contains('button', 'Entrar')
                .click();
        })
    })

    it('Must successfuly transfer money when data and values are valid', () => {
        cy.get('label[for="conta-origem"]').parent().as('conta-origem-field'); //creates a nickname for cy.get('label[for="conta-origem"]').parent()
        cy.get('@conta-origem-field')
            .click(); //find the son, go back up to the parent and find the option we want. << This is complicated...
        cy.get('@conta-origem-field')
            .contains('Maria Oliveira').click();

        cy.get('label[for="conta-destino"]').parent().as('conta-destino-field');
        cy.get('@conta-destino-field')
            .click();
        cy.get('@conta-destino-field')
            .contains('João da Silva').click();

        cy.get('#valor')
            .click()
            .type('11');
        
        cy.contains('button', 'Transferir').click();

        //Assertions
        cy.get('.toast').should('be.visible');
        cy.get('.toast').should('have.text','Transferência realizada!');
        cy.get('.toast').should('have.class','toast green');
    })


})