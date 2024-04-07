import React, { useEffect, useState } from 'react';
import Profile from './components/profile';
import DecisionModal from './components/decision-modal';
import Sidebar from './components/sidebar';
import HandDisplay from './components/hand-display';
import styles from './styles/home.module.css';
import NewGameModal from './components/new-game-modal';
import { startBlackjack } from './store/actions/blackjack-start';
import { getBlackjackStatus } from './store/actions/blackjack-status';
import { useDispatch, useSelector } from 'react-redux';

export function App() {

  //TODO - implement the logic for, each action, return the array of actions in the status servcei, so we can show in the scree, like the last action of the dealer or player

  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isDecisionModalOpen, setDecisionModal] = useState(false);

  const dispatch = useDispatch();

  const blackjack = useSelector((state) => state.blackjackStart);
  const status = useSelector((state) => state.blackjackStatus);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);

    dispatch(startBlackjack());
  };

  useEffect(() => {

    if (blackjack.status === 'succeeded') {
      dispatch(getBlackjackStatus());
    };
  }, [dispatch, blackjack.status]);

  useEffect(() => {
    if (status.status === 'succeeded') {
      const interval = setInterval(() => {
        // console.log('openening decision modal')
        // setDecisionModal(true);
      }, 1000);
      return () => clearInterval(interval);
    };
  }, [status.status]);

  if (!gameStarted) return <NewGameModal onStartGame={handleStartGame} />;

  if (gameStarted) return (
    <>
      {blackjack.status === 'succeeded' && <Sidebar />}
      {isDecisionModalOpen && <DecisionModal />}
      <div className={styles.container}>
        <Profile isLoading={blackjack.status === 'loading'} />
        <div className={styles.gameContainer}>
          <HandDisplay role="dealer" />
          <HandDisplay role="player" />
        </div>
      </div>
      )
    </>
  );
};



