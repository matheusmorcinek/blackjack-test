import React from 'react';
import styles from '../styles/components/card.module.css';

const suitSymbols = {
    '♥': 'heart',
    '♦': 'diamond',
    '♣': 'club',
    '♠': 'spade'
};

const Card = ({ suit, value }) => {
    return (
        <div className={`${styles.card} ${styles[suitSymbols[suit]]}`}>
            {value === 'Hidden' ? '?' : value}{suit === 'Hidden' ? '?' : suit}
        </div>
    );
};

export default Card;
