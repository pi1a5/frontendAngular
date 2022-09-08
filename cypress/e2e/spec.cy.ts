
describe('Realizar o Login com conta de Estudante e Professor', () => {

  it('realiza login estudante', () => {
    cy.visit('/supervisor');
    cy.contains('Gerenciamento de tickets');
  });
  
  
  it('realiza login professor', () => {
      cy.visit('/supervisor');
    cy.contains('Gerenciamento de tickets');
  });
  
});

