<<<<<<< HEAD

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

=======
describe('Testes Sistema de Estágio IFSP', () => {

  
  // testar a página principal da aplicação //
  it('loads examples', () => {
    cy.visit('/home');
    cy.contains('Nunca foi tão fácil gerenciar processos de estágio');
  });
  
  it('loads examples', () => {
    cy.visit('/student');
    cy.contains('Gerenciamento de tickets');
  });
  
  it('loads examples', () => {
    cy.visit('/home');
    cy.contains('Gerenciamento de tickets');
  });
  
  it('loads examples', () => {
    cy.visit('/select-course');
    cy.contains('Gerenciamento de tickets');
    cy.check('.')
  });


});


>>>>>>> 1a84e417ef6cc7d18639fc68cbdf83365416d9c4
