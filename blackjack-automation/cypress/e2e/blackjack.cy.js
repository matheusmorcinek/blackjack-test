describe('New Game Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    // Intercept requests
    cy.intercept('GET', 'http://localhost:3000/blackjack/status', (req) => {
      req.headers['cache-control'] = 'no-cache';
    }).as('getStatus');
    cy.intercept('POST', 'http://localhost:3000/blackjack/player/hit').as('postHit');
    cy.intercept('POST', 'http://localhost:3000/blackjack/player/stand').as('postStand');
  });

  it('should complete a game round and display the result', () => {
    const playerName = 'Matheus Morcinek';

    // Verify initial modal state
    cy.get('#new-game-modal-overlay').should('be.visible');
    cy.get('#new-game-modal').should('be.visible');
    cy.get('[data-testid="logo"]').should('be.visible');
    cy.contains('Welcome to Blackjack!');
    cy.get('#player-name-input').should('be.visible');
    cy.get('#start-game-button').should('contain', 'Start New Game').and('be.disabled');

    // Start the game
    cy.get('#player-name-input').type(playerName);
    cy.get('#start-game-button').should('be.enabled').click();

    // Wait for game status
    cy.wait('@getStatus', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

    // Verify player decision component
    cy.get('[data-testid="player-decision"]').should('be.visible');
    cy.get('#timer').should('be.visible');
    cy.get('#double-button').should('contain', 'Double').and('be.disabled');
    cy.get('#hit-button').should('contain', 'Hit').and('be.enabled');
    cy.get('#stand-button').should('contain', 'Stand').and('be.enabled');
    cy.get('#split-button').should('contain', 'Split').and('be.disabled');

    // Player hits
    cy.get('#hit-button').click();
    cy.wait('@postHit', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

    // Wait for game status
    cy.wait('@getStatus', { timeout: 10000 }).then(interception => {
      expect(interception.state).to.equal('Complete');
      const gameStatus = interception.response.body;

      if (gameStatus.status === 'ongoing') {
         // Player stands
        cy.get('[data-testid="player-decision"]').should('be.visible');
        cy.get('#stand-button').click();
        cy.wait('@postStand', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
        cy.wait('@getStatus', { timeout: 10000 }).then(interception => {
          expect(interception.state).to.equal('Complete');
        });

        // Verify game result
        cy.get('#game-result').should('be.visible');
        cy.get('h2').should('be.visible', { timeout: 12000 }).then($element => {
          const text = $element.text();
          expect(text).to.satisfy(result =>
            result === 'Player won!!!' || result === 'Dealer won...' || result === 'Tie'
          );
        });
      };

      if (gameStatus.status === 'player_won' || gameStatus.status === 'dealer_won' || gameStatus.status === 'tie') {
        // If the game status is not ongoing, verify the game result
        cy.get('#game-result').should('be.visible');
        cy.get('h2').should('be.visible').then($element => {
          const text = $element.text();
          expect(text).to.satisfy(result =>
            result === 'Player won!!!' || result === 'Dealer won...' || result === 'Tie'
          );
        });
      };
    });
  });
});
