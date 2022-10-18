describe('[Teste 01] Selecionar Processo', () => {



    beforeEach(() => {
        cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
      });

      it('Selecionar Processo', () => {
 
    cy.get('.font').click();
    cy.get('.ion-text-center > .button').click();
    cy.get(':nth-child(3) > .font').click();
    cy.get('ion-radio-group.md > :nth-child(1) > .ion-color').click();
    cy.get(':nth-child(2) > :nth-child(1) > .ion-text-center').click();
    cy.get(':nth-child(1) > :nth-child(3) > .title-default > .ion-color').click();
    cy.get('[size-xl="4"] > .button > .sc-ion-label-md-h').click();
    cy.get('#alert-input-2-0 > .alert-button-inner > .alert-radio-label').click();
    cy.get('.alert-button-role-confirm > .alert-button-inner').click();
    cy.get('.native-textarea').click();


cy.get('.ion-margin').click();

cy.get('#ion-overlay-6').click();


      });
    


});



      
