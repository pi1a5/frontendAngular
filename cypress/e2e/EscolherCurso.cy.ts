describe('TESTE01: SELECIONAR CURSO DESEJADO', () => {

  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/select-course');
  });



    it('Selecionar nome do Curso desejado', () => {
    cy.get('[value="tecnicoIntegrado"] > .item-has-start-slot > .ion-accordion-toggle-icon').click();
    cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();

  })

/*
  it('Prosseguir para próxima tela sem inserir prontuário', () => {
    cy.get('[value="tecnicoIntegrado"] > .item-has-start-slot > .ion-accordion-toggle-icon').click();
    cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();

    cy.get('.ion-padding-start').click();

    cy.get('.native-input').type('SP31');

  })
  */
});

describe('TESTE02: PROSSEGUIR PARA A PRÓXIMA TELA SEM PRONTUÁRIO', () => {

  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/select-course');
  });


  it('Prosseguir para próxima tela sem inserir prontuário', () => {
    cy.get('[value="tecnicoIntegrado"] > .item-has-start-slot > .ion-accordion-toggle-icon').click();
    cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();

    cy.get('.ion-padding-start').click();

    cy.get('.native-input').type('SP310');

  })

});


describe('TESTE03: PROSSEGUIR PARA A PRÓXIMA TELA SEM SP PRONTUÁRIO', () => {

  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/select-course');
  });


  it('Prosseguir para próxima tela sem inserir prontuário', () => {
    cy.get('[value="tecnicoIntegrado"] > .item-has-start-slot > .ion-accordion-toggle-icon').click();
    cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();


    cy.get('.native-input').type('3058123');
    cy.get('.ion-padding-start').click();

  })

});


describe('TESTE04: PROSSEGUIR PARA A PRÓXIMA COM MENOS DE 9 CARACTERES', () => {

  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/select-course');
  });


  it('Prosseguir para próxima tela sem inserir prontuário', () => {
    cy.get('[value="tecnicoIntegrado"] > .item-has-start-slot > .ion-accordion-toggle-icon').click();
    cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();


    cy.get('.native-input').type('3058155');
    cy.get('.ion-padding-start').click();

    cy.contains("Mensagem de Erro")

  });

});


describe('TESTE05: PROSSEGUIR PARA A PRÓXIMA COM PRONTUÁRIO CORRETO', () => {

  beforeEach(() => {
    cy.visit('https://pi1a5frontend-angular.herokuapp.com/select-course');
  });


  it('Prosseguir para próxima tela sem inserir prontuário', () => {
    cy.get('[value="tecnicoIntegrado"] > .item-has-start-slot > .ion-accordion-toggle-icon').click();
    cy.get('.accordion-expanded > :nth-child(2) > .courseItem > .font').click();


    cy.get('.native-input').type('SP305313X');
    cy.get('.ion-padding-start').click();

  });

});