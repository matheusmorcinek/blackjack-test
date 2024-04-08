import { useState } from 'react';
import styles from '../styles/components/new-game-modal.module.css';

const NewGameModal = ({ onStartGame }) => {

    const [playerName, setPlayerName] = useState('');

    const isNameEntered = playerName.trim().length > 0;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <img src='/logo.svg' alt='Blackjack logo'></img>
                <h3 className={styles.title}>Welcome to Blackjack!</h3>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => onStartGame(playerName)}
                    disabled={!isNameEntered} 
                >
                    Start New Game
                </button>
            </div>
        </div>
    );
};

export default NewGameModal;
