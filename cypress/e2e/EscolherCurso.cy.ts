describe('Efetuar Login', () => {


  beforeEach(() => {
    cy.visit('/home')

    cy.get('[data-test-id="username"]').type('deivid.almeida@aluno.ifsp.edu.br')

    cy.get('[data-test-id="username"]').type('deivid.almeida@aluno.ifsp.edu.br')
    cy.get('[data-test-id="username"]').type('deivid.almeida@aluno.ifsp.edu.br')

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
  