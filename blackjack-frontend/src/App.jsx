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

  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.blackjackStart);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameStarted(true);

    dispatch(startBlackjack());
  };

  // return (<h1>Hello!!!!</h1>)
  if (!gameStarted) return <NewGameModal onStartGame={handleStartGame} />;
  if (message) return <h1>{message}</h1>;
  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'failed') return <h1>Error: {error}</h1>;

  // <DecisionModal />
  // return (
  //   <>
  //     {!gameStarted && <NewGameModal onStartGame={handleStartGame} />}
  //     {
  //       gameStarted && (
  //         <>
  //           <Sidebar />
  //           <div className={styles.container}>
  //             <Profile />
  //             <div className={styles.gameContainer}>
  //               <HandDisplay
  //                 role="dealer"
  //                 cards={response.dealer.hand}
  //                 points={response.dealer.score}
  //               />
  //               <HandDisplay
  //                 role="player"
  //                 cards={response.player.hand}
  //                 points={response.player.score}
  //               />
  //             </div>
  //           </div>
  //         </>)
  //     }
  //   </>
  // );
};