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
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/student')

    
  });

    it('Acessar uma rota sem estando logado (Dashboard Estudante)', () => {
      cy.get('.title')
      cy.get('.ion-text-start > .ion-inherit-color')    
    
      cy.get('.contentHeight')
      cy.get('.emptyTicketIcon')
      cy.get('[size-xl="3"] > .ion-color-light > .ion-color > .md')
      })



});

