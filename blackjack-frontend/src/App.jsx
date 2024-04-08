import React, { useEffect, useState } from 'react';
import Profile from './components/profile';
import GameController from './components/game-controller';
import Sidebar from './components/sidebar';
import HandDisplay from './components/hand-display';
import styles from './styles/home.module.css';
import NewGameModal from './components/new-game-modal';
import { startBlackjack } from './store/actions/blackjack-start';
import { getBlackjackStatus } from './store/actions/blackjack-status';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoader from './components/skeleton-loader';

const BlackjackBoardLoading = () => {
  return (
    <div className={styles.skeletonGameContainer}>
      <SkeletonLoader style={{ width: '100%', height: '100%', borderRadius: '2%' }} />
    </div>
  )
};

export function App() {

  const dispatch = useDispatch();

  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');

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

  if (!gameStarted) return <NewGameModal onStartGame={handleStartGame} />;

  if (gameStarted) return (
    <>
      {blackjack.status === 'succeeded' && <Sidebar />}
      <div className={styles.container}>
        <Profile name={playerName} isLoading={blackjack.status === 'loading' && blackjack.message === ''} />
        {
          (status.status === 'succeeded' && blackjack.status === 'succeeded') ? (
            <div className={styles.gameContainer}>
              <HandDisplay role="dealer" />
              <HandDisplay role="player" />
            </div>
          ) : <BlackjackBoardLoading />
        }
        <div className={styles.gameFooterContainer}>
          <GameController />
        </div>
      </div>
    </>
  );
};
