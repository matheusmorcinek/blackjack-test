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

    res.json({
        status,
        player: {
            hand: blackjack.playerHand,
            score: blackjack.playerScore
        },
        dealer: {
            hand: blackjack.status === 'ongoing' ? [{
                "suit": 'Hidden',
                "value": 'Hidden'
            }, ...blackjack.dealerHand.slice(1)] : blackjack.dealerHand,
            score: blackjack.dealerScore
        }
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


module.exports = app;