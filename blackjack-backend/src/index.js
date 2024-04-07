const Blackjack = require('./game-logic/blackjack');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

let blackjack;

app.post('/blackjack/start', (req, res) => {
    const delay = Math.floor(Math.random() * (1000 - 1000 + 1) + 1000); // Generates a random delay between 1000ms (1s) and 3000ms (3s)
    setTimeout(() => {
        blackjack = new Blackjack();
        blackjack.dealInitialCards();
        res.status(200).json({
            message: "New game started"
            // player: {
            //     hand: blackjack.playerHand,
            //     score: blackjack.playerScore,
            // },
            // dealer: {
            //     hand: blackjack.dealerHand,
            //     score: blackjack.dealerScore,
            // }
        });
    }, delay);
});

app.get('/blackjack/status', (req, res) => {
    const delay = Math.floor(Math.random() * (1000 - 1000 + 1) + 1000); // Generates a random delay between 1000ms (1s) and 3000ms (3s)
    setTimeout(() => {
        if (!blackjack || blackjack.status === 'not_started') {
            return res.status(400).json({
                message: "No active game found. Please start a new game first."
            });
        };

        const status = blackjack.status;
        const card = blackjack.dealerHand[1];

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
                }, card] : blackjack.dealerHand,
                score: blackjack.status === 'ongoing' ? (card.value === 'A' ? '1/11' : card.value === 'K' || card.value === 'Q' || card.value === 'J' ? 10 : parseInt(card.value)) : blackjack.dealerScore
            }
        });
    }, delay);


});

app.post('/blackjack/player/hit', (req, res) => {
    const delay = Math.floor(Math.random() * (1000 - 1000 + 1) + 1000); // Generates a random delay between 1000ms (1s) and 3000ms (3s)
    setTimeout(() => {
        if (!blackjack) {
            return res.status(400).json({
                message: "Game not found. Please start a new game."
            });
        };

        try {
            blackjack.playerHit();

            res.status(200).json({
                player: {
                    hand: blackjack.playerHand,
                    score: blackjack.playerScore,
                }
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        };
    }, delay);
});

app.post('/blackjack/player/stand', (req, res) => {
    if (!blackjack) {
        return res.status(400).json({
            message: "Game not found. Please start a new game."
        });
    };

    try {
        blackjack.playerStand();

        res.status(200).json({
            player: {
                hand: blackjack.playerHand,
                score: blackjack.playerScore,
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    };
});

app.get('/blackjack/decideWinner', (req, res) => {
    if (!blackjack) {
        return res.status(400).json({
            message: "Game not found. Please start a new game."
        });
    };

    if (blackjack.status !== 'ongoing') {
        return res.status(400).json({
            message: "Game is already over."
        });
    };

    blackjack.decideWinner();

    const status = blackjack.status;
    const resultMessage = status === 'player_won' ? "Player wins!" :
        status === 'dealer_won' ? "Dealer wins." :
            "It's a tie.";

    res.json({
        message: resultMessage,
        status: status,
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


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


module.exports = app;