import { useState } from 'react';
import styles from '../styles/components/new-game-modal.module.css';

const NewGameModal = ({ onStartGame }) => {
    const [playerName, setPlayerName] = useState('');

    const isNameEntered = playerName.trim().length > 0;

    return (
        <div id="new-game-modal-overlay" className={styles.overlay}>
            <div id="new-game-modal" className={styles.modal}>
                <img src='/logo.svg' alt='Blackjack logo' data-testid="logo"></img>
                <h3 className={styles.title}>Welcome to Blackjack!</h3>
                <input
                    type="text"
                    id="player-name-input"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                    id="start-game-button"
                    className={styles.button}
                    onClick={() => onStartGame(playerName)}
                    disabled={!isNameEntered} 
                    data-testid="start-game-button"
                >
                    Start New Game
                </button>
            </div>
        </div>
    );
};

export default NewGameModal;
