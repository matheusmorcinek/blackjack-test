import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CountdownBar from './countdown-bar';
import PlayerDecision from './player-decision';
import MessageDisplay from './game-message-display';
import { useDispatch } from 'react-redux';
import { getBlackjackStatus } from '../store/actions/blackjack-status';
import InitialGameMessages from './initial-game-messages';

const gameSteps = [
    'dealer_preparing_game', 
    'player_decision', 
    'dealer_giving_cards_message_display', 
    'dealer_decision', 
    'game_result'
];

const PlayerDecisionMessage = ({ start }) => {

    const [timeLeft, setTimeLeft] = useState(start || 5);

    useEffect(() => {

        if (timeLeft === 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const width = (timeLeft / 5) * 100;

    return (
        <div>
            <CountdownBar width={width} />
            <MessageDisplay />
        </div>
    )
};


const GameController = () => {

    const [currentStep, setCurrentStep] = useState('dealer_preparing_game');

    useEffect(() => {
        if (currentStep === 'dealer_preparing_game') {

            //mostra dealer messages
            //seta o current step para player decision
            
            // setTimeout(() => setCurrentStep('player_decision'), 5000);
        
        }
    }, [currentStep]);

    useEffect(() => {
        if (currentStep === 'player_decision') {
            setTimeout(() => setCurrentStep('dealer_giving_cards_message_display'), 5000);
        }
    }, [currentStep]);

    // useEffect(() => {
    //     if (currentStep === 'dealer_giving_cards_message_display') {
    //         setTimeout(() => setCurrentStep('dealer_decision'), 5000);
    //     }
    // }, [currentStep]);

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
    if (currentStep === 'player_decision') return <h1>player decision</h1>;
    if (currentStep === 'dealer_giving_cards_message_display') return <h1>dealer giving cards message display</h1>;
    if (currentStep === 'dealer_decision') return <h1>dealer decision</h1>;
    if (currentStep === 'game_result') return <h1>game result</h1>;


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