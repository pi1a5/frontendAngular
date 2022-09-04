it('loads examples', () => {
  cy.visit('/supervisor');
  cy.contains('Gerenciamento de tickets');
});

it('loads examples', () => {
  cy.visit('/home');
  cy.contains('Gerenciamento de tickets');
});
