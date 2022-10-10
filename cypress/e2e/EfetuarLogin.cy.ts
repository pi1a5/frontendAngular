describe('Acessar Rota para Efetuar Login', () => {

  // https://pi1a5frontend-angular.herokuapp.com/home
  // https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fpi1a5frontend-angular.herokuapp.com%3Fid%3Dauth964337&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&include_granted_scopes=true&client_id=376654667965-lq5rc8l7q8c6cdtl2gdc6baj6d15n3bs.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fpi1a5frontend-angular.herokuapp.com&fetch_basic_profile=true&gsiwebsdk=2
  beforeEach(() => {
    cy.visit('https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fpi1a5frontend-angular.herokuapp.com%3Fid%3Dauth964337&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&include_granted_scopes=true&client_id=376654667965-lq5rc8l7q8c6cdtl2gdc6baj6d15n3bs.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fpi1a5frontend-angular.herokuapp.com&fetch_basic_profile=true&gsiwebsdk=2');
  });


  it('Acessar Botão de Login', () => {

    cy.get('.font').click();
   
  });
});


