import React, { useState } from 'react';
import Card from './components/card';
import Profile from './components/profile';
import DecisionModal from './components/decision-modal';
import Sidebar from './components/sidebar';
import HandDisplay from './components/hand-display';
import styles from './styles/home.module.css';
import NewGameModal from './components/new-game-modal';

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

  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);
  };
  // <DecisionModal />
  return (
    <>
      {!gameStarted && <NewGameModal onStartGame={handleStartGame} />}
      {
        gameStarted && (
          <>
            <Sidebar />
            <div className={styles.container}>
              <Profile />
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
          </>)
      }
    </>
  );
};