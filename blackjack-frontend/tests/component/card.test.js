import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../../src/components/card';

describe('Card Component', () => {

    test('renders the card value and suit correctly', () => {
        render(<Card suit="♥" value="A" />);
        const cardElement = screen.getByText('A♥');
        expect(cardElement).toBeInTheDocument();
    });

    test('renders the card value and suit correctly for diamond', () => {
        render(<Card suit="♦" value="K" />);
        const cardElement = screen.getByText('K♦');
        expect(cardElement).toBeInTheDocument();
    });

    test('renders the card value and suit correctly for club', () => {
        render(<Card suit="♣" value="10" />);
        const cardElement = screen.getByText('10♣');
        expect(cardElement).toBeInTheDocument();
    });

    test('renders the card value and suit correctly for spade', () => {
        render(<Card suit="♠" value="J" />);
        const cardElement = screen.getByText('J♠');
        expect(cardElement).toBeInTheDocument();
    });

    test('renders "?" for hidden value and suit', () => {
        render(<Card suit="Hidden" value="Hidden" />);
        const cardElement = screen.getByText('??');
        expect(cardElement).toBeInTheDocument();
    });

    test('applies correct class for spade suit', () => {
        render(<Card suit="♠" value="J" />);
        const cardElement = screen.getByText('J♠');
        expect(cardElement).toHaveClass('spade');
    });

    test('applies correct class for heart suit', () => {
        render(<Card suit="♥" value="A" />);
        const cardElement = screen.getByText('A♥');
        expect(cardElement).toHaveClass('heart');
    });
    
    test('applies correct class for diamond suit', () => {
        render(<Card suit="♦" value="K" />);
        const cardElement = screen.getByText('K♦');
        expect(cardElement).toHaveClass('diamond');
    });
    
    test('applies correct class for club suit', () => {
        render(<Card suit="♣" value="10" />);
        const cardElement = screen.getByText('10♣');
        expect(cardElement).toHaveClass('club');
    });
    
    test('applies correct class for spade suit', () => {
        render(<Card suit="♠" value="J" />);
        const cardElement = screen.getByText('J♠');
        expect(cardElement).toHaveClass('spade');
    });
});

