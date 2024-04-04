const Card = require('./card');

class Deck {

    constructor() {
        this.cards = [];
        this.reset();
        this.shuffle();
    };

    reset() {
        const suits = ['♠', '♣', '♥', '♦'];
        // const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        this.cards = [];

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            };
        };
    };

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        };
    };

    draw() {
        if (this.cards.length === 0) {
            throw new Error("No cards left in the deck");
        };
        
        return this.cards.pop();
    };

    getCards() {
        return this.cards;
    };
};

module.exports = Deck;