describe('Acessar Rota para Efetuar Login', () => {
  // https://pi1a5frontend-angular.herokuapp.com/home
  // https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fpi1a5frontend-angular.herokuapp.com%3Fid%3Dauth964337&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&include_granted_scopes=true&client_id=376654667965-lq5rc8l7q8c6cdtl2gdc6baj6d15n3bs.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fpi1a5frontend-angular.herokuapp.com&fetch_basic_profile=true&gsiwebsdk=2
  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
  });


  it('Acessar Botão de Login', () => {

    cy.get('.font').click();
  });

});


describe('Acessar Rota para Efetuar Login', () => {

  // https://pi1a5frontend-angular.herokuapp.com/home
  // https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fpi1a5frontend-angular.herokuapp.com%3Fid%3Dauth964337&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&include_granted_scopes=true&client_id=376654667965-lq5rc8l7q8c6cdtl2gdc6baj6d15n3bs.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fpi1a5frontend-angular.herokuapp.com&fetch_basic_profile=true&gsiwebsdk=2
  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/home');
  });


  it('Acessar Botão de Login', () => {
    cy.get('.font').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.font').click();
    cy.get('.ion-text-center > .button').click();
    cy.get('.contentList > :nth-child(3)').click();
    cy.get('ion-card-header.ion-text-center > .ion-color-translucent > .button').click();
    cy.get('.contentList > :nth-child(4)').click();
    cy.get('.ion-text-center > .md').click();
    cy.get('.contentList > :nth-child(2)').click();
    cy.get('.ion-text-center > .button').click();
    cy.get('p > .ion-color').click();
    cy.get('.font').click();
    cy.get('.ion-text-center > .button').click();
    cy.get(':nth-child(4) > .font').click();
    cy.get('.ion-text-center > .md').click();
    cy.get('.contentList > :nth-child(2)').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.font').click();
    cy.get('.ion-text-center > .button').click();
    cy.get('.contentList > :nth-child(3)').click();
    cy.get('ion-card-header.ion-text-center > .ion-color-translucent > .button').click();
    cy.get('.contentList > :nth-child(4)').click();
    cy.get('.ion-text-center > .md').click();
    cy.get('.contentList > :nth-child(2)').click();
    cy.get('.ion-text-center > .button').click();
    cy.get('p > .ion-color').click();
    cy.get('.font').click();
    cy.get('.ion-text-center > .button').click();
    cy.get(':nth-child(4) > .font').click();
    cy.get('.ion-text-center > .md').click();
    cy.get('.contentList > :nth-child(2)').click();
    /* ==== End Cypress Studio ==== */
  });
});


