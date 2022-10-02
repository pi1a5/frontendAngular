describe('Efetuar Logout da aplicação', () => {



    beforeEach(() => {
        cy.visit('/student');
      });

    it('Ao Abrir Menu e clicar em logout, retornar home', () => {

        cy.get('.ion-text-center > .button').click();
        
        cy.get('p > .ion-color').click();

      });



})

