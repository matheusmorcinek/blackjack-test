import { useEffect, useState } from 'react';
import styles from '../styles/components/decision-modal.module.css';

const DecisionModal = ({ onHit, onStand }) => {

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

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.timer}>{timer}</div>
                <p className={styles.title}>Make your decision</p>
                <div>
                    <button className={`${styles.button} ${styles.disabledButton}`} disabled>Double</button>
                    <button className={`${styles.button} ${styles.hitButton}`} onClick={onHit}>Hit</button>
                    <button className={`${styles.button} ${styles.standButton}`} onClick={onStand}>Stand</button>
                    <button className={`${styles.button} ${styles.disabledButton}`} disabled>Split</button>
                </div>
            </div>
        </div>
    );
};

export default DecisionModal;
