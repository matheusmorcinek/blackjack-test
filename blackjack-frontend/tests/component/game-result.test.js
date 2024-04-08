import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import GameResult from '../../src/components/game-result';

// Mocking do CountdownBar para evitar lógica interna complexa
jest.mock('../../src/components/countdown-bar.jsx', () => ({ width }) => <div data-testid="countdown-bar" style={{ width: `${width}%` }}></div>);

describe('GameResult Component', () => {
    jest.useFakeTimers();

    it.each([
        ['dealer', 'Dealer won...'],
        ['player', 'Player won!!!'],
        ['tie', 'Tie'],
    ])('renders the correct message for a %s win', (result, expectedMessage) => {
        render(<GameResult result={result} onCompleteCountdown={jest.fn()} />);

        expect(screen.getByTestId(`${result}-game-result`)).toBeInTheDocument();
        expect(screen.getByText(expectedMessage)).toBeInTheDocument();
    });

    it('renders CountdownBar with correct width', () => {
        const secondsToCountdown = 5;
        render(<GameResult result="dealer" onCompleteCountdown={jest.fn()} secondsToCountdown={secondsToCountdown} />);

        act(() => {
            jest.advanceTimersByTime(1000); // Avança 1 segundo
        });

        // Verifica se a largura da barra de contagem regressiva é correta após 1 segundo
        const countdownBar = screen.getByTestId("countdown-bar");
        expect(countdownBar).toHaveStyle(`width: 80%`);
    });

    // Restaura os timers reais após os testes
    afterAll(() => {
        jest.useRealTimers();
    });
});
