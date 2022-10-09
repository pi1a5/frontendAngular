describe('TESTE 01: Controle de Sessão de rotas', () => {


  beforeEach(() => {
    cy.visit('localhost:4200/select-course')

    
  });

    it('Acessar uma rota sem estar logado (Escolher Curso)', () => {
      cy.get('.title')
      cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();
    })



});

describe('TESTE 02: Controle de Sessão de rotas', () => {


  beforeEach(() => {
    cy.visit('localhost:4200/home')

    
  });

    it('Acessar uma rota sem estar logado (Escolher Curso)', () => {
      cy.get('.title')
      cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();
    })



});

