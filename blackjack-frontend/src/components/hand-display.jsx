import React from "react";
import Card from "./card";
import styles from '../styles/components/hand-display.module.css';
import { useSelector } from 'react-redux';

const HandDisplay = ({ role }) => {

    const label = role === 'dealer' ? "Dealer's Hand" : "Your Hand";

    const blackjackStatus = useSelector((state) => state.blackjackStatus);

    return (
        <div>
            <h3 className={styles.title}>{label}</h3>
            <div className={styles.innerContainer}>
                {blackjackStatus.data[role].hand.map((card, index) => {
                    return <Card key={index} suit={card.suit} value={card.value} />;
                })}
                <div>
                    <h3 className={styles.points}>{blackjackStatus.data[role].score}</h3>
                </div>
            </div>
        </div>
    );
};

export default HandDisplay;


