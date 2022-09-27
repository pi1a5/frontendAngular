describe('Efetuar Login', () => {


  beforeEach(() => {
    cy.visit('/home');
  
    it('clicar botão de Login', () => {
      cy.get('.button').click();
    })

    
  });











  it('Visitar Página de Aluno', () => {
    cy.visit('/student')
  });


  it('Entrar com E-mail Instituicional de Aluno', () => {
    cy.get('.button').type('teste');
  });

  it('Entrar com E-mail Instituicional de Orientador', () => {
    cy.get('.button')

  });

  it('Entrar sem e-mail institucional', () => {
    cy.get('.button')
  });
  

  it('Entrar com E-mail Instituicional de Aluno', () => {
    cy.get('.button').type('teste');
  })
  

  });
  