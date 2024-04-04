const Blackjack = require('../../src/game-logic/blackjack');
const Card = require('../../src/game-logic/card');

describe('Blackjack class', () => {
    let blackjack;

    beforeEach(() => {
        blackjack = new Blackjack();
    });

    //game actions validations

    test('dealInitialCards gives two cards each to player and dealer', () => {
        blackjack.dealInitialCards();
        expect(blackjack.playerHand.length).toBe(2);
        expect(blackjack.dealerHand.length).toBe(2);
    });

    test('playerHit adds a card to player hand', () => {
        blackjack.dealInitialCards(); // Ensure there are initial cards to simulate blackjack start
        const initialPlayerHandSize = blackjack.playerHand.length;
        blackjack.playerHit();
        expect(blackjack.playerHand.length).toBe(initialPlayerHandSize + 1);
    });

    test('playerStand stops the player from taking more cards and lets dealer take their turn', () => {
        blackjack.dealInitialCards();
        blackjack.playerStand();
        expect(blackjack.status).not.toBe('ongoing');
    });

    test('decideWinner correctly identifies a player win', () => {
        // Mocking scores directly for simplicity
        blackjack.playerScore = 20;
        blackjack.dealerScore = 18;
        blackjack.decideWinner();
        expect(blackjack.status).toBe('player_won');
    });

    test('decideWinner correctly identifies a dealer win due to player bust', () => {
        blackjack.playerScore = 22; // Player busts
        blackjack.dealerScore = 18;
        blackjack.decideWinner();
        expect(blackjack.status).toBe('dealer_won');
    });

    test('decideWinner correctly identifies a tie', () => {
        blackjack.playerScore = 21; // Player busts
        blackjack.dealerScore = 21;
        blackjack.decideWinner();
        expect(blackjack.status).toBe('tie');
    });

    test('resetGame resets the game to initial state', () => {
        blackjack.dealInitialCards();
        blackjack.playerHit(); 
        blackjack.resetGame();
        blackjack.dealInitialCards();

        expect(blackjack.playerHand.length).toBe(2); 
        expect(blackjack.dealerHand.length).toBe(2);
        expect(blackjack.status).toBe('ongoing');
    });

    //calculate score validations

    test('correctly calculates score with numeric cards', () => {
        blackjack.playerHand = [new Card('♠', '2'), new Card('♦', '3')];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(5);
    });

    test('correctly calculates score with face cards', () => {
        blackjack.playerHand = [new Card('♣', 'J'), new Card('♥', 'Q')];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(20);
    });

    test('correctly calculates score with an Ace and a low card', () => {
        blackjack.playerHand = [new Card('♠', 'A'), new Card('♦', '3')];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(14);
    });

    test('correctly treats Ace as 1 when score exceeds 21', () => {
        blackjack.playerHand = [new Card('♠', 'A'), new Card('♦', '9'), new Card('♥', 'Q')];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(20);
    });

    test('correctly calculates score with multiple Aces', () => {
        blackjack.playerHand = [new Card('♠', 'A'), new Card('♦', 'A'), new Card('♥', '9')];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(21);
    });

    test('returns 0 for an empty hand', () => {
        blackjack.playerHand = [];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(0);
    });

    test('correctly handles a hand with multiple Aces not busting', () => {
        blackjack.playerHand = [new Card('♠', 'A'), new Card('♦', 'A'), new Card('♥', 'A')];
        expect(blackjack.calculateScore(blackjack.playerHand)).toBe(13);
    });
});
