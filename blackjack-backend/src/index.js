const Blackjack = require('./game-logic/blackjack');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let blackjack;

app.post('/blackjack/start', (req, res) => {
    blackjack = new Blackjack();
    blackjack.dealInitialCards();
    res.status(200).json({
        message: "New game started",
        player: {
            hand: blackjack.playerHand,
            score: blackjack.playerScore,
        },
        dealer: {
            hand: blackjack.dealerHand,
            score: blackjack.dealerScore,
        }
    });
});

app.get('/blackjack/status', (req, res) => {

    if (!blackjack || blackjack.status === 'not_started') {
        return res.status(400).json({
            message: "No active game found. Please start a new game first."
        });
    };

    const status = blackjack.status;
    const playerHand = blackjack.playerHand;
    const dealerHand = blackjack.dealerHand;
    const playerScore = blackjack.calculateScore(playerHand);
    const dealerScore = blackjack.status !== 'ongoing' ? blackjack.calculateScore(dealerHand) : 'Hidden';

    res.json({
        status,
        playerHand,
        playerScore,
        dealerHand: blackjack.status === 'ongoing' ? ['Hidden', ...dealerHand.slice(1)] : dealerHand,
        dealerScore
    });
});

app.post('/blackjack/hit', (req, res) => {
    blackjack.playerHit();

    res.status(200).json({
        player: {
            hand: blackjack.playerHand,
            score: blackjack.playerScore,
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});