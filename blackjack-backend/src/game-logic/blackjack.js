const Deck = require('./deck');

class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.resetGame();
    }

    resetGame() {
        this.deck.shuffle();
        this.playerHand = [];
        this.dealerHand = [];
        this.playerScore = 0;
        this.dealerScore = 0;
        this.status = 'ongoing'; // ongoing, player_won, dealer_won, tie
    }

    dealInitialCards() {
        this.playerHand.push(this.deck.draw(), this.deck.draw());
        this.dealerHand.push(this.deck.draw(), this.deck.draw());
        this.updateScores();
    }

    playerHit() {
        if (this.status !== 'ongoing') {
            throw new Error("Game is not in an 'ongoing' state.");
        };

        this.playerHand.push(this.deck.draw());
        this.updateScores();

        if (this.playerScore > 21) {
            this.status = 'dealer_won';
        };
    }

    playerStand() {
        //move to a seppareted method?
        while (this.dealerScore < 17) {
            this.dealerHand.push(this.deck.draw());
            this.updateScores();
        };

        this.decideWinner();
    }

    updateScores() {
        this.playerScore = this.calculateScore(this.playerHand);
        this.dealerScore = this.calculateScore(this.dealerHand);
    }

    decideWinner() {
        if (this.playerScore > 21) {
            this.status = 'dealer_won';
        } else if (this.dealerScore > 21 || this.playerScore > this.dealerScore) {
            this.status = 'player_won';
        } else if (this.playerScore < this.dealerScore) {
            this.status = 'dealer_won';
        } else {
            this.status = 'tie';
        };
    }

    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        for (let card of hand) {
            if (card.value === 'A') {
                aces++;
            };

            score += card.getScore();
        };

        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        };

        return score;
    };
};

module.exports = Blackjack;

// const Deck = require('./deck');

// class Blackjack {
//     constructor() {
//         this.deck = new Deck();
//         this.playerHand = [];
//         this.dealerHand = [];
//         this.playerScore = 0;
//         this.dealerScore = 0;
//         this.status = 'ongoing'; // ongoing, player_won, dealer_won, tie
//     };

//     calculateScore(hand) {
//         let score = 0;
//         let aces = 0;

//         for (let card of hand) {
//             if (card.value === 'A') {
//                 aces++;
//             };

//             score += card.getScore();
//         };

//         while (score > 21 && aces > 0) {
//             score -= 10;
//             aces--;
//         };

//         return score;
//     }
// };

// module.exports = Blackjack;