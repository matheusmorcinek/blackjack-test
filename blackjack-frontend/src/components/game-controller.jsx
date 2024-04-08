import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlayerDecision from './player-decision';
import { useDispatch } from 'react-redux';
import { getBlackjackStatus } from '../store/actions/blackjack-status';
import InitialGameMessages from './initial-game-messages';
import GamePlayerActionMessages from './game-player-action-messages';
import { startBlackjack } from '../store/actions/blackjack-start';

const GameController = () => {

    const dispatch = useDispatch();

    const blackjackStatus = useSelector((state) => state.blackjackStatus);
    const blackjackPlayerHit = useSelector((state) => state.blackjackPlayerHit);
    const blackjackPlayerStand = useSelector((state) => state.blackjackPlayerStand);

    const [currentStep, setCurrentStep] = useState('dealer_preparing_game');

    useEffect(() => {
        if (currentStep === 'dealer_preparing_game') {
            if (blackjackStatus.status === 'succeeded') {
                setTimeout(() => setCurrentStep('player_decision'), 1000);
            };
        };
    }, [currentStep, blackjackStatus.status]);

    useEffect(() => {
        if (currentStep === 'player_decision') {

            if (blackjackPlayerHit.status === 'loading') {
                setCurrentStep('player_action_message_display_hit');
            };

            if (blackjackPlayerStand.status === 'loading') {
                setCurrentStep('player_action_message_display_stand');
            };
        };
    }, [currentStep, blackjackPlayerHit.status, blackjackPlayerStand.status]);

    useEffect(() => {
        if (currentStep === 'player_action_message_display_stand') {

            //check status
            if (blackjackPlayerStand.status === 'succeeded') {
                dispatch(getBlackjackStatus());
            };
        };
    }, [currentStep, blackjackPlayerStand.status]);

    useEffect(() => {
        if (currentStep === 'player_action_message_display_hit') {

            //check status
            if (blackjackPlayerHit.status === 'succeeded') {
                dispatch(getBlackjackStatus());
            };
        };
    }, [currentStep, blackjackPlayerHit.status]);


    const playerStand = () => {
        setCurrentStep('player_action_message_display_stand');
    };

    const startNewGame = () => {
        dispatch(startBlackjack());
        setCurrentStep('dealer_preparing_game');
    };

    //verifica status
    useEffect(() => {
        if (blackjackStatus.status === 'succeeded' && (
            currentStep === 'player_action_message_display_hit' ||
            currentStep === 'player_action_message_display_stand'
        )) {

            if (blackjackStatus.data.status === 'dealer_won') {
                setCurrentStep('game_result_dealer_won');
                setTimeout(() => startNewGame(), 3000);
            };

            if (blackjackStatus.data.status === 'player_won') {
                setCurrentStep('game_result_player_won');
                setTimeout(() => startNewGame(), 3000);
            };

            if (blackjackStatus.data.status === 'tie') {
                setCurrentStep('game_result_tie');
                setTimeout(() => startNewGame(), 3000);
            };

            if (blackjackStatus.data.status === 'ongoing') {
                setCurrentStep('player_decision');
            };
        };
    }, [blackjackStatus.status]);

    if (currentStep === 'dealer_preparing_game') return <InitialGameMessages />;
    if (currentStep === 'player_decision') return <PlayerDecision onTimeEnd={playerStand} />;
    if (currentStep === 'player_action_message_display_hit') return <GamePlayerActionMessages />;
    if (currentStep === 'player_action_message_display_stand') return <GamePlayerActionMessages />;
    if (currentStep === 'game_result_dealer_won') return <h2>Dealer won</h2>;
    if (currentStep === 'game_result_player_won') return <h2>Player won</h2>;
    if (currentStep === 'game_result_tie') return <h2>Tie</h2>;
};

export default GameController;