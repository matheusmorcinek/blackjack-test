const Card = require('../../src/game-logic/card');

describe('Card class', () => {

  test('should correctly assign suit and value', () => {
    const card = new Card('♥', '10');
    expect(card.suit).toBe('♥');
    expect(card.value).toBe('10');
  });

  test('face cards (J, Q, K) should have a score of 10', () => {
    const jack = new Card('♠', 'J');
    const queen = new Card('♦', 'Q');
    const king = new Card('♣', 'K');
    expect(jack.getScore()).toBe(10);
    expect(queen.getScore()).toBe(10);
    expect(king.getScore()).toBe(10);
  });

  test('numeric cards should have a score equal to their value', () => {
    for (let i = 2; i <= 10; i++) {
      const card = new Card('♥', i.toString());
      expect(card.getScore()).toBe(i);
    }
  });

  test('Aces should have a score of 11', () => {
    const ace = new Card('♠', 'A');
    expect(ace.getScore()).toBe(11);
  });

  //negative scenarios
  test('throws error with invalid suit', () => {
    expect(() => {
      new Card('InvalidSuit', '5');
    }).toThrow('Invalid card suit: InvalidSuit');
  });

  test('throws error with invalid value', () => {
    expect(() => {
      new Card('♥', '55');
    }).toThrow('Invalid card value: 55');
  });
});