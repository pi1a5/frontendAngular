describe('Escolher Curso Desejado', () => {

    beforeEach(() => {
        cy.visit('/select-course')
      });

    it('Selecionar Nome do Curso Desejado', () => {

        cy.get('[value="first"] > .ion-color > .sc-ion-label-md-h');
        cy.contains('Técnico Integrado');
      });


})

