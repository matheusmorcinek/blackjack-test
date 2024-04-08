import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import '@testing-library/jest-dom';
import GameController from '../../src/components/game-controller';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('GameController Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders initial game messages while game is starting', () => {
        useSelector.mockReturnValue({ status: 'loading' });

        render(<GameController />);

        const messageDisplayElement = screen.getByTestId('message-display');
        expect(messageDisplayElement).toBeInTheDocument();
    });

    it('renders player decision when game status is ongoing', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStart: { status: 'succeeded' },
            blackjackStatus: { status: 'succeeded', data: { status: 'ongoing' } },
        }));

        render(<GameController />);

        const playerDecisionElement = screen.getByTestId('player-decision');
        expect(playerDecisionElement).toBeInTheDocument();
    });

    it('renders game result for a dealer win', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStart: { status: 'succeeded' },
            blackjackStatus: { status: 'succeeded', data: { status: 'dealer_won' } },
        }));

        render(<GameController />);

        const element = screen.getByTestId('dealer-game-result');
        expect(element).toBeInTheDocument();
    });

    it('renders game result for a player win', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStart: { status: 'succeeded' },
            blackjackStatus: { status: 'succeeded', data: { status: 'player_won' } },
        }));

        render(<GameController />);

        const element = screen.getByTestId('player-game-result');
        expect(element).toBeInTheDocument();
    });

    it('renders game result for a tie', () => {
        useSelector.mockImplementation(callback => callback({
            blackjackStart: { status: 'succeeded' },
            blackjackStatus: { status: 'succeeded', data: { status: 'tie' } },
        }));
       
        render(<GameController />);

        const element = screen.getByTestId('tie-game-result');
        expect(element).toBeInTheDocument();
    });
});
