it('loads examples', () => {
  cy.visit('/supervisor');
  cy.contains('Gerenciamento de tickets');
});
