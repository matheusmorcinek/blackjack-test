import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CountdownBar from './countdown-bar';
import PlayerDecision from './player-decision';
import MessageDisplay from './game-message-display';
import { useDispatch } from 'react-redux';
import { getBlackjackStatus } from '../store/actions/blackjack-status';
import InitialGameMessages from './initial-game-messages';
import GamePlayerActionMessages from './game-player-action-messages';

const gameSteps = [
    'dealer_preparing_game',
    'player_decision',
    'dealer_giving_cards_message_display',
    'dealer_decision',
    'game_result'
];

const GameController = () => {

    const dispatch = useDispatch();

    const blackjackStatus = useSelector((state) => state.blackjackStatus);
    const blackjackPlayerHit = useSelector((state) => state.blackjackPlayerHit);

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
                setCurrentStep('player_action_message_display')
            };
        }
    }, [currentStep, blackjackPlayerHit.status]);

    useEffect(() => {
        if (currentStep === 'player_action_message_display') {

            //check status
            if (blackjackPlayerHit.status === 'succeeded') {
                console.log('completouuuuuuuu')
                dispatch(getBlackjackStatus());
            };

            // if(blackjackStatus.status === 'succeeded') {
            //     console.log('verificando status!!!!')
            // }

            // setTimeout(() => setCurrentStep('dealer_decision'), 5000);
        }
    }, [currentStep, blackjackPlayerHit.status]);

    //verifica status
    useEffect(() => {

        //

        console.log('@@@@ status store');
        console.log(blackjackStatus);
        console.log(blackjackPlayerHit);

        if (
            blackjackStatus.status === 'succeeded' &&
            currentStep === 'player_action_message_display' &&
            blackjackPlayerHit.hitCount > 0
        ) {
            console.log('verificando status!!!!')

            if (blackjackStatus.data.status === 'dealer_won') {
                //TODO show dealer won message and end game, show dealer hand,
                //TODO after 5 seconds show new game message button
                console.log('@@@@@ dealer won');
            };

            if (blackjackStatus.data.status === 'player_won') {
                //show player won message and end game, show dealer hand,
                //TODO after 5 seconds show new game message button
                console.log('@@@@@ player won');
            };

            if(blackjackStatus.data.status === 'tie') {
                //show tie message and end game, show dealer hand,
                //TODO after 5 seconds show new game message button
                console.log('@@@@@ tie');
            };

            //TODO testar com proximos passos, pode ser que chame aqui quando nao precisarmos
            if(blackjackStatus.data.status === 'ongoing' && blackjackPlayerHit.hitCount > 0) {
                console.log('@@@@@ ongoing');
                setCurrentStep('player_decision');
            };



            // possible outcomes
            // player_won
            // dealer_won
            // tie
            // ongoing
            // player_busted



        }

    }, [blackjackStatus.status]);

    // useEffect(() => {
    //     if (currentStep === 'dealer_decision') {
    //         setTimeout(() => setCurrentStep('game_result'), 5000);
    //     }
    // }, [currentStep]);

    // useEffect(() => {
    //     if (currentStep === 'game_result') {
    //         setTimeout(() => setCurrentStep('dealer_preparing_game'), 5000);
    //     }
    // }, [currentStep]);

    //now I need a retrun with different components for each step
    if (currentStep === 'dealer_preparing_game') return <InitialGameMessages />;
    if (currentStep === 'player_decision') return <PlayerDecision />;
    if (currentStep === 'player_action_message_display') return <GamePlayerActionMessages />;
    // if (currentStep === 'dealer_decision') return <h1>dealer decision</h1>;
    // if (currentStep === 'game_result') return <h1>game result</h1>;


    // const status = useSelector((state) => state.blackjackStatus);
    // const blackjackPlayerHit = useSelector((state) => state.blackjackPlayerHit);

    // const dispatch = useDispatch();


    // const steps = [
    //     'player_decision',
    //     'dealer_giving_cards_message_display',
    //     'dealer_decision',
    //     'game_result',
    // ];

    // //now i need a usestate to controll the steps
    // const [currentStep, setCurrentStep] = useState('message_display');


    // //starta pela primeira vez
    // useEffect(() => {
    //     if (status.status === 'succeeded') {
    //         setTimeLeft(5);
    //     };
    // }, [status.status]);

    // useEffect(() => {
    //     if (timeLeft === 0 && status.status !== 'idle' && status.status !== 'loading' && status.status !== 'failed') {
    //         setCurrentStep('player_decision');
    //     }
    // }, [timeLeft]);

    // useEffect(() => {
    //     if (blackjackPlayerHit.status === 'succeeded') {
    //         dispatch(getBlackjackStatus());
    //     };
    // }, [blackjackPlayerHit.status]);



    // useEffect(() => {
    //     console.log('@@@@@@@@');
    //     console.log('status', status.status);
    //     console.log('player hit', blackjackPlayerHit);
    //     console.log('time left', timeLeft);
    //     console.log(currentStep);
    // });

    // 5 seconds ....
    // player decision
    // player decision
    // delars decision
    // game result message
    // if no decision - game timeout - with possibility to start a new one

    // if (true) return <h1>loading...</h1>;
    // if (status.status === 'success') return <PlayerDecision />;


    //cartas => hit => status => hit => status => stand (dealer play) => status => final
    //I need something to controll these calls


    // if (timeLeft > 0 && currentStep === 'message_display') return (
    //     <div>
    //         <CountdownBar width={width} />
    //         <MessageDisplay />
    //     </div>
    // );
    // if (timeLeft === 0 && currentStep === 'player_decision') return <PlayerDecision />;
    // if (status.status === 'loading' || blackjackPlayerHit.status === 'loading') return <h1>Loading status...</h1>;

};

export default GameController;






// const steps = [
//     'dealer_preparing_game', //show dealer messages
//     'player_decision', //hit? dealer_giving_cards_message_display : dealer_decision
//     'dealer_giving_cards_message_display',
//     'dealer_decision',
//     'game_result', //show game result
// ];




// const messages = [
//     "Beat the dealer to 21!",
//     "Standing on 17+ is common.",
//     "Blackjack is worldwide famous.",
//     "Analyze hands wisely.",
//     "Aces are 1 or 11, face cards 10.",
//     "Risk it for the biscuit!",
//     "Is the dealer bluffing?",
//     "21 is the magic number.",
//     "Faces and aces, the winning bases.",
//     "Watch the dealer's hand."
// ];