describe('[Teste 01]Entrar com o E-mail Institucional pela primeira vez [Aluno]', () => {



    beforeEach(() => {
        cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
      });

      it('Abrir Menu de tickets criados', () => {
 
        cy.get('.font').click();
        cy.get('.ion-text-center > .button').click();

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






      
