describe('Blackjack Game', () => {
  it('user should be able to play blackjack', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Blackjack Game');
    cy.contains('Deal');
    cy.contains('Hit');
    cy.contains('Stand');
  });
});
