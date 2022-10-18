describe('[Teste 01]Selecionar uma das cargas horárias', () => {
    beforeEach(() => {
        cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
      });

    it('Selecionar Carga horária', () => {

      cy.get('.font').click();
      cy.get('.ion-text-center > .button').click();

    });


    it('infoCarga', function() {
      
        cy.get('app-googlebutton > p').click();
        cy.get('.font').click();
        cy.get('.ion-text-center > .button').click();
        cy.get('.contentList').click();
        cy.get(':nth-child(3) > .font').click();
        cy.get('ion-radio-group.md > :nth-child(1) > .ion-color').click();
        cy.get('[size-xl="4"] > .button > .sc-ion-label-md-h').click();
        cy.get('#alert-input-2-0 > .alert-button-inner > .alert-radio-label').click();
        cy.get('#alert-input-2-1 > .alert-button-inner > .alert-radio-label').click();
        cy.get('.alert-button-role-confirm > .alert-button-inner').click();
        /* ==== End Cypress Studio ==== */
    });
})

describe('[Teste 02]Entrar com o E-mail Institucional pela primeira vez [Orientador]', () => {



    beforeEach(() => {
        cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
      });

      it('Abrir Menu de tickets criados', () => {

      });
    


})

describe('[Teste 03]Entrar com o E-mail que não seja institucional', () => {



    beforeEach(() => {
        cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
      });

      it('Abrir Menu de tickets criados', () => {

      });
    


})






      
