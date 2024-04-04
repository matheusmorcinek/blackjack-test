const Blackjack = require('../../src/game-logic/blackjack');
const Card = require('../../src/game-logic/card'); 

describe('Full game simulation', () => {
    let game;

    beforeEach(() => {
        game = new Blackjack();
        game.dealInitialCards();
    });

    test('simulates a player winning match', () => {
        // Mock cards to control the game outcome.
        // For this simulation, let's ensure the player will win.
        game.playerHand = [new Card('♦', '10'), new Card('♠', '7')]; // Player starts with 17
        game.dealerHand = [new Card('♣', '9'), new Card('♥', '6')]; // Dealer starts with 15
        
        // The player decides to stand with a score of 17.
        game.playerStand();

        // Simulate dealer's turn. Assume `dealerAction` handles the dealer logic to draw cards.
        // Here, you'd control the dealer's hand to simulate the game.
        // For simplicity, we're assuming the dealer draws a card that makes them lose.
        // Normally, the dealer drawing would be part of the `playerStand` or a separate method.
        // game.dealerHand.push(new Card('♠', '6')); // Dealer ends with 21 and busts, assuming they are forced to hit at 15
        
        // Dealer action might automatically decide the winner, or you might call a method explicitly.
        game.decideWinner(); // Make sure this method updates the game status based on the hands.

        // Check the final status to confirm the player won.
        expect(game.status).toBe('player_won');
    });

    // Further tests can simulate a dealer win, a tie, player bust, etc.
});
