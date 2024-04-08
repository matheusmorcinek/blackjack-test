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

    //preciso que este componente controle o fluxo do jogo
    //1. quando o jogo inicia, o dealer prepara o jogo e mostrar na tela as mensagens iniciais ( <InitialGameMessages />)
    //2. após o dealer preparar o jogo, o jogador precisa tomar uma decisão ( <PlayerDecision onTimeEnd={playerStand} />)
    //3. durante a tomada de decisão do jogador, o jogador pode clicar em hit ou stand em no maximo 10 segundos.
    // caso o jogador não tome uma decisão, o jogo automaticamente chama a função playerStand
    //4. após o jogador tomar uma decisão, o jogo precisa mostrar as mensagens de ação do jogador ( <GamePlayerActionMessages />)
    //5. sempre que uma chamada de hit ou stand for feita, enquanto algum status está em loading, é preciso mostrar <GamePlayerActionMessages />
    //6. sempre que um blackjackStatus.status retornar 'succeeded', precisamos verificar o status e apresentar <GameResult result={'dealer'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={5} /> se o status de blackjackStatus.data.status for 'dealer_won'
    //ou <GameResult result={'player'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={5} /> se o status de blackjackStatus.data.status for 'player_won'
    //ou <GameResult result={'tie'} onCompleteCountdown={onCompleteCountdown} secondsToCountdown={5} /> se o status de blackjackStatus.data.status for 'tie'
    //ou <PlayerDecision onTimeEnd={playerStand} /> se o status de blackjackStatus.data.status for 'ongoing'
    //7. sempre que um jogo terminar, a função onCompleteCountdown é chamada automaticamente pelo GameResult e um novo jogo é iniciado

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