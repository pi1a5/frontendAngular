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


