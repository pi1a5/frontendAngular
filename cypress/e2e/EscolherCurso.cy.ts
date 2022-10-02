describe('Escolher Curso Desejado', () => {


    beforeEach(() => {
        cy.visit('/student');
      });

    it('Selecionar Nome do Curso Desejado', () => {

        cy.get('.ion-text-center > .button').click();
        cy.contains('Técnico Integrado');
      });


})

