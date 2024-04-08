import { useEffect, useState } from 'react';
import styles from '../styles/components/player-decision.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { playerHit } from '../store/actions/blackjack-player-hit';
import { playerStand } from '../store/actions/blackjack-player-stand';

const PlayerDecision = ({ onTimeEnd }) => {

    const dispatch = useDispatch();

    const [timer, setTimer] = useState(10);
    const [dots, setDots] = useState('');
    const [actionDisabled, setActionDisabled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : '.'));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            dispatch(playerStand());
            setActionDisabled(true);
            return;
        };

        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // useEffect(() => {
    //     if (blackjackHitStatus === 'loading' || blackjackStandStatus === 'loading') {
    //         setActionDisabled(true);
    //     } else {
    //         setActionDisabled(false);
    //     }
    // }, [blackjackHitStatus, blackjackStandStatus]);

    const onHit = () => {
        setActionDisabled(true);
        dispatch(playerHit());
    };
    const onStand = () => {
        setActionDisabled(true);
        dispatch(playerStand());
    };

    return (
        <div className={styles.decisionContainer}>
            <div className={styles.timer}>{timer} Make your decision<span>{dots}</span></div>
            <div className={styles.innerButtonContainer}>
                <button className={`${styles.button} ${styles.disabledButton}`} disabled>Double</button>
                <button className={`${styles.button} ${actionDisabled ? styles.disabledButton : styles.hitButton}`} onClick={onHit} disabled={actionDisabled}>Hit</button>
                <button className={`${styles.button} ${actionDisabled ? styles.disabledButton : styles.standButton}`} onClick={onStand} disabled={actionDisabled}>Stand</button>
                <button className={`${styles.button} ${styles.disabledButton}`} disabled>Split</button>
            </div>
        </div>
    );
};

export default PlayerDecision;
