const Deck = require('../../src/game-logic/deck'); 

describe('Deck class', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test('initializes with the correct number of cards', () => {
    expect(deck.getCards().length).toBe(52);
  });

  test('shuffles the deck', () => {
    const originalOrder = deck.getCards().map(card => card.toString());
    deck.shuffle();
    const shuffledOrder = deck.getCards().map(card => card.toString());
    expect(shuffledOrder).not.toEqual(originalOrder);
  });

  test('draws a card, reducing the deck size by one', () => {
    const originalLength = deck.getCards().length;
    deck.draw();
    expect(deck.getCards().length).toBe(originalLength - 1);
  });

  test('drawing all cards empties the deck', () => {
    const totalCards = deck.getCards().length;
    for (let i = 0; i < totalCards; i++) {
      deck.draw();
    }
    expect(deck.getCards().length).toBe(0);
  });

  test('throws an error when drawing from an empty deck', () => {
    const totalCards = deck.getCards().length;
    for (let i = 0; i < totalCards; i++) {
      deck.draw();
    }
    expect(() => deck.draw()).toThrow("No cards left in the deck");
  });

  test('remainingCards returns the correct number of cards', () => {
    deck.draw();
    deck.draw();
    expect(deck.getCards().length).toBe(50);
  });
});
