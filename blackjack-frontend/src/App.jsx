import React, { useState } from 'react';
import Card from './components/card';
import Profile from './components/profile';
import DecisionModal from './components/decision-modal';
import Sidebar from './components/sidebar';
import HandDisplay from './components/hand-display';
import styles from './styles/home.module.css';
import NewGameModal from './components/new-game-modal';
import { startBlackjack } from './store/actions/blackjack-start';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoader from './components/skeleton-loader';

const response = {
  "message": "New game started",
  "player": {
    "hand": [
      {
        "suit": "♥",
        "value": "K"
      },
      {
        "suit": "♦",
        "value": "A"
      }
    ],
    "score": 21
  },
  "dealer": {
    "hand": [
      {
        "suit": "♣",
        "value": "J"
      },
      {
        "suit": "♠",
        "value": "3"
      }
    ],
    "score": 13
  }
}

export function App() {

  //TODO - implement the logic for, each action, return the array of actions in the status servcei, so we can show in the scree, like the last action of the dealer or player

  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.blackjackStart);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);

    dispatch(startBlackjack());
  };

  // return (<h1>Hello!!!!</h1>)
  // if (!gameStarted) return <NewGameModal onStartGame={handleStartGame} />;
  // if (message) return <h1>{message}</h1>;
  // if (status === 'loading') return <h1>Loading...</h1>;
  // if (status === 'failed') return <h1>Error: {error}</h1>;

  // <DecisionModal />
  // {status === 'loading' ? ( <div className={styles.container}><SkeletonLoader style={{ width: '100px', height: '20px', borderRadius: '4px' }} /></div>) : (

  if (!gameStarted) return <NewGameModal onStartGame={handleStartGame} />;
  if (gameStarted) return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <Profile isLoading={status === 'loading'}/>
        <div className={styles.gameContainer}>
          <HandDisplay
            role="dealer"
            cards={response.dealer.hand}
            points={response.dealer.score}
          />
          <HandDisplay
            role="player"
            cards={response.player.hand}
            points={response.player.score}
          />
        </div>
      </div>
      )
    </>
  );
};