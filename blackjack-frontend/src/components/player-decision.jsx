import { useEffect, useState } from 'react';
import styles from '../styles/components/player-decision.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { playerHit } from '../store/actions/blackjack-player-hit';

const PlayerDecision = () => {

    const dispatch = useDispatch();

    const [timer, setTimer] = useState(60);

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
    const onStand = () => { };

    return (
        <>
            <div className={styles.timer}>{timer}</div>
            <p className={styles.title}>Make your decision</p>
            <div>
                <button className={`${styles.button} ${styles.disabledButton}`} disabled>Double</button>
                <button className={`${styles.button} ${styles.hitButton}`} onClick={onHit}>Hit</button>
                <button className={`${styles.button} ${styles.standButton}`} onClick={onStand}>Stand</button>
                <button className={`${styles.button} ${styles.disabledButton}`} disabled>Split</button>
            </div>
        </>
    );
};

export default PlayerDecision;
