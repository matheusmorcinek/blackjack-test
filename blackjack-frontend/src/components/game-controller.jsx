import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlayerDecision from './player-decision';
import { useDispatch } from 'react-redux';
import { getBlackjackStatus } from '../store/actions/blackjack-status';
import InitialGameMessages from './initial-game-messages';
import { startBlackjack } from '../store/actions/blackjack-start';
import GameResult from './game-result';
import React from 'react';

const GameController = () => {

    const dispatch = useDispatch();
    const blackjackStatus = useSelector((state) => state.blackjackStatus);
    const blackjackStart = useSelector((state) => state.blackjackStart);

    useEffect(() => {
        dispatch(startBlackjack());
    }, [dispatch]);

    const playerStand = () => {
        dispatch(getBlackjackStatus());
    };

    const onCompleteCountdown = () => {
        dispatch(startBlackjack());
    };

    if (blackjackStart.status === 'loading') return <InitialGameMessages />;

    if (blackjackStart.status === 'failed') return <p>Failed to start the game</p>;

    if (blackjackStatus.status === 'loading') return <InitialGameMessages />;

    if (blackjackStatus.status === 'failed') return <p>Failed to get the game status</p>;

    if (blackjackStatus.status === 'succeeded') {
        if (blackjackStatus.data.status === 'dealer_won') return <GameResult result={'dealer'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={5} />;
        if (blackjackStatus.data.status === 'player_won') return <GameResult result={'player'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={5} />;
        if (blackjackStatus.data.status === 'tie') return <GameResult result={'tie'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={5} />;
        if (blackjackStatus.data.status === 'ongoing') return <PlayerDecision onTimeEnd={playerStand} />;
    };
};

export default GameController;