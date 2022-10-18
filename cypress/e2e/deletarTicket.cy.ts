describe('[Teste 01]Deletar Ticket', () => {



    beforeEach(() => {
        cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
      });

      it('Deletar Ticket pendente', () => {
 
        cy.get('.font').click();
        cy.get('.ion-text-center > .button').click();

      });
})