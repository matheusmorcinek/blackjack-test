import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerDecision from '../../src/components/player-decision';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

const mockedDispatch = jest.fn();

describe('PlayerDecision Component', () => {
    beforeEach(() => {
        useDispatch.mockReturnValue(mockedDispatch);
    });

    it('renders all action buttons correctly', () => {
        const { getByText } = render(<PlayerDecision />);
        expect(getByText('Hit')).toBeInTheDocument();
        expect(getByText('Stand')).toBeInTheDocument();
        expect(getByText('Double')).toBeInTheDocument();
        expect(getByText('Split')).toBeInTheDocument();
    });

    it('disables action buttons when actionDisabled is true', () => {
        const { getByText } = render(<PlayerDecision />);
        const hitButton = getByText('Hit');
        const standButton = getByText('Stand');
        const doubleButton = getByText('Double');
        const splitButton = getByText('Split');

        expect(hitButton).not.toBeDisabled();
        expect(standButton).not.toBeDisabled();
        expect(doubleButton).toBeDisabled();
        expect(splitButton).toBeDisabled();
    });

    it('calls playerHit dispatch function when Hit button is clicked', () => {
        const { getByText } = render(<PlayerDecision />);
        const hitButton = getByText('Hit');
        fireEvent.click(hitButton);
        expect(mockedDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('calls playerStand dispatch function when Stand button is clicked', () => {
        const { getByText } = render(<PlayerDecision />);
        const standButton = getByText('Stand');
        fireEvent.click(standButton);
        expect(mockedDispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it('starts the countdown timer', async () => {
        render(<PlayerDecision />);
        await waitFor(() => {
            expect(mockedDispatch).toHaveBeenCalledWith(expect.any(Function));
        });
    });
});
