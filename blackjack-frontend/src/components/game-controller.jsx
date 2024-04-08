import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlayerDecision from './player-decision';
import { useDispatch } from 'react-redux';
import { getBlackjackStatus } from '../store/actions/blackjack-status';
import InitialGameMessages from './initial-game-messages';
import GamePlayerActionMessages from './game-player-action-messages';
import { startBlackjack } from '../store/actions/blackjack-start';
import GameResult from './game-result';

const GameController = () => {

    const dispatch = useDispatch();

    const blackjackStatus = useSelector((state) => state.blackjackStatus);
    const blackjackPlayerHit = useSelector((state) => state.blackjackPlayerHit);
    const blackjackPlayerStand = useSelector((state) => state.blackjackPlayerStand);

    const [currentStep, setCurrentStep] = useState('dealer_preparing_game');

    useEffect(() => {
        if (currentStep === 'dealer_preparing_game') {

            if (blackjackStatus.status === 'succeeded' && blackjackStatus.data.status === 'player_won') {
                console.log('use effect - player won')
                setCurrentStep('game_result_player_won');
            };

            if (blackjackStatus.status === 'succeeded') {
                console.log('player decision')
                setTimeout(() => setCurrentStep('player_decision'), 3000);
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
        console.log('calling startNewGame')
        dispatch(startBlackjack());
        setCurrentStep('dealer_preparing_game');
    };

    const onCompleteCountdown = () => {
        console.log('terminouuu');
        startNewGame();
    };

    //verifica status
    useEffect(() => {
        if (blackjackStatus.status === 'succeeded' && (
            currentStep === 'player_action_message_display_hit' ||
            currentStep === 'player_action_message_display_stand'
        )) {

            if (blackjackStatus.data.status === 'dealer_won') {
                setCurrentStep('game_result_dealer_won');
            };

            if (blackjackStatus.data.status === 'player_won') {
                setCurrentStep('game_result_player_won');
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
    if (currentStep === 'game_result_dealer_won') return <GameResult role={'dealer'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={3} />;
    if (currentStep === 'game_result_player_won') return <GameResult role={'player'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={3} />;
    if (currentStep === 'game_result_tie') return <h2>Tie</h2>;
};

export default GameController;