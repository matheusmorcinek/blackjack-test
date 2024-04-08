import React from 'react';
import styles from '../styles/components/countdown-bar.module.css';

const CountdownBar = ({ width }) => {
    
    return (
        <div className={styles.countdownContainer}>
            <div className={styles.countdownBar} style={{ width: `${width}%` }}></div>
        </div>
    );
};

export default CountdownBar;
