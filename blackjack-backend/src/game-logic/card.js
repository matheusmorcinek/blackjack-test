class Card {

    constructor(suit, value) {

        const validSuits = ['♠', '♣', '♥', '♦'];
        const validValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        if (!validSuits.includes(suit)) {
            throw new Error(`Invalid card suit: ${suit}`);
        };

        if (!validValues.includes(value)) {
            throw new Error(`Invalid card value: ${value}`);
        };

        this.suit = suit;
        this.value = value;
    };

    getScore() {
        if (this.value === 'A') {
            return 11;
        };

        if (['J', 'Q', 'K'].includes(this.value)) {
            return 10;
        };

        return parseInt(this.value);
    };

    toString() {
        return `==== ${this.value} of ${this.suit} ====`;
    };
};

module.exports = Card;