import { useEffect, useState } from 'react';
import styles from '../styles/components/player-decision.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { playerHit } from '../store/actions/blackjack-player-hit';

const PlayerDecision = () => {

    const dispatch = useDispatch();

    const [timer, setTimer] = useState(60);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
        }, 500); 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            return;
        };

        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const onHit = () => {
        dispatch(playerHit());
    };
    const onStand = () => {
        
    };

    return (
        <div className={styles.decisionContainer}>
            <div className={styles.timer}>{timer} Make your decision<span>{dots}</span></div>
            <div className={styles.innerButtonContainer}>
                <button className={`${styles.button} ${styles.disabledButton}`} disabled>Double</button>
                <button className={`${styles.button} ${styles.hitButton}`} onClick={onHit}>Hit</button>
                <button className={`${styles.button} ${styles.standButton}`} onClick={onStand}>Stand</button>
                <button className={`${styles.button} ${styles.disabledButton}`} disabled>Split</button>
            </div>
        </div>
    );
};

export default PlayerDecision;
