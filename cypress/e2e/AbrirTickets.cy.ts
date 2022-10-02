describe('Abrir Menu de Tickets', () => {



    beforeEach(() => {
        cy.visit('/student');
      });

      it('Abrir Menu de tickets criados', () => {

        cy.get('.ion-text-center > .button').click();
        cy.contains('#inbox-list > :nth-child(2) > .font')
      });
    


})





      
