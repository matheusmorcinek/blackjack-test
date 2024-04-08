import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HandDisplay from '../../src/components/hand-display';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

const statusMock = {
    "status": "ongoing",
    "player": {
        "hand": [
            {
                "suit": "♥",
                "value": "Q"
            },
            {
                "suit": "♠",
                "value": "3"
            }
        ],
        "score": 13
    },
    "dealer": {
        "hand": [
            {
                "suit": "Hidden",
                "value": "Hidden"
            },
            {
                "suit": "♠",
                "value": "4"
            }
        ],
        "score": 4
    }
};

describe('HandDisplay Component', () => {
    it('displays the correct label for the dealer', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStatus: { status: 'succeeded', data: statusMock },
        }));

        render(<HandDisplay role="dealer" />);
        expect(screen.getByText("Dealer's Hand")).toBeInTheDocument();
    });

    it('displays the correct label for the player', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStatus: { status: 'succeeded', data: statusMock },
        }));

        render(<HandDisplay role="player" />);

        expect(screen.getByText("Your Hand")).toBeInTheDocument();
    });

    const playerHand = [
        { suit: "♥", value: "Q" },
        { suit: "♠", value: "3" }
    ];

    const dealerHand = [
        { suit: "Hidden", value: "Hidden" },
        { suit: "♠", value: "4" }
    ];

    const statusMockWithMoreCards = {
        status: "ongoing",
        player: {
            hand: [...playerHand, { suit: "♦", value: "A" }],
            score: 14
        },
        dealer: {
            hand: [...dealerHand, { suit: "♣", value: "7" }, { suit: "♣", value: "9" }],
            score: 20
        }
    };

    it('displays correct number of cards for player', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStatus: { status: 'succeeded', data: statusMock },
        }));

        render(<HandDisplay role="player" />);

        expect(screen.getAllByTestId("card")).toHaveLength(playerHand.length);
    });

    it('displays correct number of cards for dealer', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStatus: { status: 'succeeded', data: statusMock },
        }));

        render(<HandDisplay role="dealer" />);

        expect(screen.getAllByTestId("card")).toHaveLength(dealerHand.length);
    });

    it('displays correct number of cards for player with more cards', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStatus: { status: 'succeeded', data: statusMockWithMoreCards },
        }));

        render(<HandDisplay role="player" />);

        expect(screen.getAllByTestId("card")).toHaveLength(statusMockWithMoreCards.player.hand.length);
    });

    it('displays correct number of cards for dealer with more cards', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStatus: { status: 'succeeded', data: statusMockWithMoreCards },
        }));

        render(<HandDisplay role="dealer" />);

        expect(screen.getAllByTestId("card")).toHaveLength(statusMockWithMoreCards.dealer.hand.length);
    });
});
